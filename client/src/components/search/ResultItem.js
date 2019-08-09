import React, { Component } from 'react';
import { Label } from 'semantic-ui-react'

// class ResultItem extends Component {
//   render() {
//     const { title, summary, content } = this.props;
//     return(
//       <div>
//         <Label content={"asdfass"}/>
//         <p>{ summary }</p>
//       </div>
//     );
//   };
// }

const ResultItem = ({ title, summary, content }) => {
  return(
    <div>
      <Label content={title}/>
      <p>{ summary }</p>
    </div>
  );
}

export default ResultItem;