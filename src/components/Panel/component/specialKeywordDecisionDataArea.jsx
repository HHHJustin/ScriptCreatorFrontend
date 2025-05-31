import { DataAreaWrapper } from "../modalStyle";

const SpecialKeywordDecisionDataArea = ({ node, onGoNext }) => {
    const allData = node.data.content;
  
    if (!allData || !Array.isArray(allData)) {
      return <div>沒有資料</div>;
    }
  
    const columns = [
      { key: 'id', label: '編號', align: 'center', width: '20%' },
      { key: 'keyword', label: '關鍵字', align: 'center', width: '80%' },
    ];
  
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
  
  export default SpecialKeywordDecisionDataArea;