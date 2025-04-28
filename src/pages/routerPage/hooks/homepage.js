import { addEdge } from 'reactflow';

export const fetchGraphData = async (channel, setNodes, setEdges) => {
  try {
    const res = await fetch(`/api/${channel}/home`);
    const data = await res.json();

    const newNodes = data.nodes.map(node => ({
      id: String(node.id),
      type: 'indexNode',
      position: { x: Number(node.x), y: Number(node.y) },
      data: {
        title: node.title,
        type: node.type,
      },
      style: { zIndex: 1 },
    }));

    const newEdges = data.links.map(link => ({
      id: `e${link.from}-${link.to}`,
      source: String(link.from),
      target: String(link.to),
      sourceHandle: link.sourceFrom ? `keyword-${link.sourceFrom}` : undefined,
      type: 'customEdge',
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  } catch (err) {
    console.error('Failed to fetch graph data:', err);
  }
};

export const updateNodeLocation = async (node, channel) => {
  try {
    await fetch('/api/updatelocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentNodeId: Number(node.id),
        channelId: Number(channel),
        locX: node.position.x,
        locY: node.position.y,
      }),
    });
  } catch (err) {
    console.error('Failed to update node location:', err);
  }
};

export const createOnConnect = (setEdges) => {
  return (params) => {
    setEdges((eds) => addEdge({ ...params, type: 'customEdge' }, eds));
  };
};

export const createOnNodesChange = (nodes, onNodesChangeBase, updateNodeLocation, channel) => {
  return (changes) => {
    changes.forEach((change) => {
      if (change.type === 'position' && change.position) {
        const movedNode = nodes.find((n) => n.id === change.id);
        if (movedNode) {
          const updatedNode = {
            ...movedNode,
            position: {
              ...movedNode.position,
              ...change.position,
            },
          };
          updateNodeLocation(updatedNode, channel);
        }
      }
    });

    onNodesChangeBase(changes);
  };
};

  
