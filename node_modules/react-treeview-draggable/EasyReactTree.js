/**
 * Created by asvsfs on 5/16/2015.
 */
/**
 * Created by asvsfs on 5/14/2015.
 */
import Draggable from 'react-draggable';
import React from 'react';
import $ from 'jquery';

class EasyReactTree extends React.Component {

  constructor(props) {
    super(props);
    this.elementDragged = null;
    this.elemIndex = 0 ;
  }

  componentWillMount(){

  }

  componentDidMount(){
  }

  render() {
    this.elemIndex = 0 ;
    const resTree = this.props.dataSource.map((entry,i)=>{
      return this.nestedTree(entry);
    });
    return (
      <div id="content">
        {resTree}
      </div>
    );
  }

  nestedTree(root){

    var type = root.type;
    let childs = root.childs;
    var label =
        <span className="tree-node"
              onDragStart={this.handleDrag.bind(this,root)}
              onDrop={this.handleDrop.bind(this,root)}
              onDragOver ={e=>{e.preventDefault();}}>
              {root.Name}
            </span>;


    return(
        <TreeView defaultCollapsed={false} key={type + '|' + this.elemIndex++} nodeLabel ={label}>
          {childs.map((entry, i)=> {
            if (entry.childs !== undefined && entry.childs.length > 0) {
              return this.nestedTree(entry);
            } else {
              return (
                      <div draggable="true"  key={i}
                           onDragStart={this.handleDrag.bind(this,entry)}
                           onDrop={this.handleDrop.bind(this,entry)}
                           onDragOver ={e=>{e.preventDefault();}}
                          >
                     <span data-index={i}
                           unselectable="on">{entry.text}</span>
                      </div>
              );
            }
          })}
        </TreeView>
    );
  }
  handleDrag(entry,event){
    this.elementDragged = {entry:entry,e:event.target};
  }

  handleDrop(entry,event) {
    if(entry === this.elementDragged.entry || (entry.Type == 0 && this.elementDragged.entry.Type == 0))
      return ;

    let index = parseInt($(this.elementDragged.e).data('index'));

    entry.childs.push(this.elementDragged.entry);
    this.elementDragged.entry.parent.childs.splice(index, 1);
    this.elementDragged.entry.parent = entry;
    this.elementDragged = null;
    this.setState({});
  }
}

export default EasyReactTree;
