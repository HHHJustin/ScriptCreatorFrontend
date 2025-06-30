import { addEdge } from 'reactflow';
import { useCallback } from 'react';

/**
 * 取得圖形資料
 * 
 * @param {string} channel - 頻道ID
 * @param {function} setNodes - 設定節點
 * @param {function} setEdges - 設定邊
 * @param {array} tags - 標籤篩選
 * @param {function} navigate - react-router-dom navigate
 */
export const fetchGraphData = async (channel, setNodes, setEdges, tags = [], navigate) => {
  const tagParams = tags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
  const url = `/api/${channel}/home${tagParams ? `?${tagParams}` : ''}`;

  try {
    const res = await fetch(url, {
      credentials: "include"
    });

    if (res.status === 401) {
      navigate('/login');
      return;
    }

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();

    // 安全防呆
    const rawNodes = Array.isArray(data.nodes) ? data.nodes : [];
    const rawLinks = Array.isArray(data.links) ? data.links : [];

    const newNodes = rawNodes.map(node => ({
      id: String(node.id),
      type: 'indexNode',
      position: { x: Number(node.x), y: Number(node.y) },
      data: {
        title: node.title,
        type: node.type,
      },
      style: { zIndex: 1 },
    }));

    const newEdges = rawLinks.map(link => ({
      id: `e${link.from}-${link.to}`,
      source: String(link.from),
      target: String(link.to),
      sourceHandle: link.sourceFrom ? `${link.sourceFrom}` : undefined,
      type: 'customEdge',
    }));

    setNodes(newNodes);
    setEdges(newEdges);

  } catch (err) {
    console.error('Failed to fetch graph data:', err);
  }
};

/**
 * 提供刷新圖形的hook
 */
export const useOnRefreshGraph = (channel, setNodes, setEdges, navigate) => {
  return useCallback(() => {
    fetchGraphData(channel, setNodes, setEdges, [], navigate);
  }, [channel, setNodes, setEdges, navigate]);
};

/**
 * 更新節點位置
 */
export const updateNodeLocation = async (node, channel) => {
  try {
    await fetch(`/api/${channel}/updatelocation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentNodeId: Number(node.id),
        locX: node.position.x,
        locY: node.position.y,
      }),
    });
  } catch (err) {
    console.error('Failed to update node location:', err);
  }
};

/**
 * 創建連線時的處理
 */
export const createOnConnect = (setEdges, channel) => {
  return async (params) => {
    const { source, sourceHandle, target } = params;
    setEdges((eds) => addEdge({ ...params, type: 'customEdge' }, eds));
    try {
      await fetch(`/api/${channel}/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: source,
          sourceHandle: sourceHandle || null, 
          targetId: target,
        }),
      });
      console.log('✅ 已傳送連線資料到後端:', { source, sourceHandle, target });
    } catch (err) {
      console.error('❌ Failed to connect nodes:', err);
    }
  };
};

/**
 * 節點移動時的更新
 */
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
