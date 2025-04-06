import { SimpleBezierEdge } from 'reactflow';

const CustomEdge = (props) => {
  return (
    <SimpleBezierEdge
      {...props}
      style={{
        stroke: '#1ebb11',            
        strokeWidth: 1,             
        strokeDasharray: '5 5',
        animation: 'dashmove 1s linear infinite',
      }}
      animated
    />
  );
};

export default CustomEdge;
