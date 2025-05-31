import { DataAreaWrapper, Th, Tr, Td, BranchGoNextNode } from "../modalStyle";

const columns = [
  { key: 'id', label: '編號', align: 'center', width: '20%' },
  { key: 'tags', label: '標籤', align: 'center', width: '80%' },
];

const TagDecisionDataArea = ({ node, onGoNext }) => {
    const allData = node.data.content;
  
    if (!allData || !Array.isArray(allData)) {
      return <div>沒有資料</div>;
    }

    return (
      <DataAreaWrapper>
        <Table>
          <thead>
            <tr>
              {columns.map((col) => (
                <Th key={col.key}>
                  {col.label}
                </Th>
              ))}
              <Th></Th> 
            </tr>
          </thead>
          <tbody>
            {allData.map((item) => (
              <Tr key={item.id}>
                {columns.map((col) => (
                  <Td
                    key={col.key}
                    style={{
                      textAlign: col.align,
                      width: col.width,
                      whiteSpace: col.key === 'content' ? 'normal' : 'nowrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {item[col.key]}
                  </Td>
                ))}
                <Td style={{ textAlign: 'center' }}>
                  <BranchGoNextNode onClick={() => onGoNext(item.id)}>▶︎</BranchGoNextNode>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </DataAreaWrapper>
    );
  };

  export default TagDecisionDataArea;