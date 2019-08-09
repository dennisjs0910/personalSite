import React from 'react';
import MediaTextArea from './MediaTextArea';

const MediaTextAreaList = ({ mediaList, handleMediaTextChange, handleMediaRemove }) => {
  return mediaList.map((item, idx) => (
    <MediaTextArea
      key={ idx }
      idx={ idx }
      item={ item }
      handleMediaTextChange={ handleMediaTextChange }
      handleMediaRemove={ handleMediaRemove }
    />
  ));
};

export default MediaTextAreaList;