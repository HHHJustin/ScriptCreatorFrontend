import React, { useState, useEffect } from 'react';
import { StyledNodeTitleInput, StyledNodeTitleSpan } from '../modalStyle';


function EditableNodeTitle({ node, onTitleChange, setNodes, channel }) {
  const title = node.data.title;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  const handleBlurOrEnter = () => {
    setIsEditing(false);
    if (onTitleChange && editedTitle !== title) {
      onTitleChange(node, editedTitle, setNodes, channel);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlurOrEnter();
    }
  };

  return isEditing ? (
    <StyledNodeTitleInput
      type="text"
      value={editedTitle}
      onChange={(e) => setEditedTitle(e.target.value)}
      onBlur={handleBlurOrEnter}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <StyledNodeTitleSpan onClick={() => setIsEditing(true)}>
      {editedTitle || '未命名節點'}
    </StyledNodeTitleSpan>
  );
}

export default EditableNodeTitle;
