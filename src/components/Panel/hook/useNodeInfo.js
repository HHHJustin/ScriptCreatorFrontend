import { useEffect, useState, useCallback } from 'react';

export default function useNodeInfo(node, channel) {
  const [fetchedNode, setFetchedNode] = useState(null);

  const fetchNodeData = useCallback(async () => {
    if (!node || !channel) return;
    try {
      const res = await fetch(`/api/${channel}/${node.id}/fetchInfo`);
      const data = await res.json();
      setFetchedNode(data);
    } catch (err) {
      console.error('❌ Fetch node info failed:', err);
    }
  }, [node?.id, channel]); // ✅ 用 id 而非整個 node

  useEffect(() => {
    if (node && channel) {
      fetchNodeData();
    }
  }, [node?.id, channel]);

  return { fetchedNode, refresh: fetchNodeData };
}
