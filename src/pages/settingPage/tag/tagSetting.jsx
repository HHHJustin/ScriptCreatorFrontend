import React, { useState } from 'react';
import TagTable from './tagSettingStyle';

const TagSettingPage = () => {
    const [tags, setTags] = useState([
        { id: 1, name: '標籤1' },
        { id: 2, name: '標籤2' },
    ]);

    const handleAddTag = (newTag) => {
        const newId = tags.length + 1;
        setTags([...tags, { id: newId, name: newTag }]);
    };

    const handleDeleteTag = (id) => {
        setTags(tags.filter(tag => tag.id !== id));
    };

    const handleEditTag = (id) => {
        console.log('點擊編輯標籤 ID:', id);
    };

    return (
        <div style={{ padding: '10px' }}>
        <TagTable
            tags={tags}
            onAddTag={handleAddTag}
            onDeleteTag={handleDeleteTag}
            onEditTag={handleEditTag}
        />
        </div>
    );
};

export default TagSettingPage;
