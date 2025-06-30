
import React, { useState, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import Navbar from '../../components/header/navbar';
import Panel from '../../components/panel/Panel';
import IndexNode from '../../components/nodes/indexNode';
import CustomEdge from '../../components/edge/edge';
import { useParams, useNavigate } from 'react-router-dom';
import { updateNodeLocation, createOnConnect, createOnNodesChange, fetchGraphData } from './hooks/homepage';


const nodeTypes = {
  indexNode: IndexNode,
};
  
const edgeTypes = {
  customEdge: CustomEdge,
};

const getInitialViewport = () => {
  const stored = localStorage.getItem('viewport');
  return stored ? JSON.parse(stored) : { x: 0, y: 0, zoom: 1 };
};

const HomePage = () => {
  const { channel } = useParams(); 
  const [nodes, setNodes, onNodesChangeBase] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [barMenuOpen, setBarMenuOpen] = useState(false);
  const [viewport, setViewport] = useState(getInitialViewport());
  const navigate = useNavigate();
  const onConnect = useCallback(createOnConnect(setEdges, channel), [setEdges]);
  const onNodesChange = useCallback(createOnNodesChange(nodes, onNodesChangeBase, updateNodeLocation, channel), [nodes, onNodesChangeBase, channel]);
  
  const [tagList, setTagList] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  
  const fetchFilterTags = useCallback(async () => {
    try {
      const res = await fetch(`/api/${channel}/filtertags/fetchInfo`
      , {credentials: "include"});
      if (res.status === 401) {
        // 沒有登入，導回登入頁
        navigate('/');
        return;
      }
      const data = await res.json();
      const formattedFilterTags = Array.isArray(data.filterTags)
        ? data.filterTags.map(item => ({
            id: item.FilterTagID,
            tag: item.FilterTagName
          }))
        : [];
      setTagList(formattedFilterTags);
    } catch (err) {
      console.error('Fetch tags info failed:', err);
    }
  }, [channel]);
  
  const onSearch = useCallback((tags) => {
    setActiveTags(tags);
    fetchGraphData(channel, setNodes, setEdges, tags); 
  }, [channel]);

  useEffect(() => {
    fetchFilterTags();
    fetchGraphData(channel, setNodes, setEdges);
  }, [channel]);
  
  useEffect(() => {
    localStorage.setItem('viewport', JSON.stringify(viewport));
  }, [viewport]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Navbar
        barMenuOpen={barMenuOpen}
        setBarMenuOpen={setBarMenuOpen}
        onSearch={onSearch}
        tagList={tagList}
      />

      <ReactFlowProvider>
      <Panel
        nodes={nodes}
        setNodes={setNodes}
        onNodesChange={onNodesChange} 
        edges={edges}
        setEdges={setEdges}
        onConnect={onConnect}
        setBarMenuOpen={setBarMenuOpen}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        viewport={viewport}
        setViewport={setViewport}
        tagList={tagList}
        onRefreshTags={fetchFilterTags}
      />
      </ReactFlowProvider>
    </div>
  );
};

export default HomePage;
