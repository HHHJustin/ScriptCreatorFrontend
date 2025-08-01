import { StyledButton } from "../modalStyle";
import React, { useState } from "react";

const TagSelectorModal = ({ tags, selected, onSave, onClose }) => {
  const [selectedTags, setSelectedTags] = useState(selected);

  const toggleTag = (id) => {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="modal">
      <h3>選擇標籤</h3>
      <div>
        {tags.map(tag => (
          <StyledButton
            key={tag.id}
            style={{
              margin: "4px",
              backgroundColor: selectedTags.includes(tag.id) ? "green" : "lightgray",
            }}
            onClick={() => toggleTag(tag.id)}
          >
            {tag.name}
          </StyledButton>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <StyledButton onClick={() => onSave(selectedTags)}>儲存</StyledButton>
        <StyledButton style={{ marginLeft: "8px" }} onClick={onClose}>取消</StyledButton>
      </div>
    </div>
  );
};

export default TagSelectorModal;
