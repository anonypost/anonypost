import React from 'react'
import request from 'browser-request'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

var ulStyle = {
  listStyle: 'none',
  marginTop: 10,
  padding: 0
}


Yavanna.provide('Comments', ({CreateComment, Vote}) => {

  return React.createClass({

// export default class Comments extends React.Component {
    getInitialState () {
      return {post: {title: "", author: "", body: ""}, comments: []}
    },

    componentDidMount () {
      console.log("Console mounted")
      var postID = this.props.params.postID
      this.serverRequest = request('/api/post/'+ postID + '/comments/', function (er, response, body) {
        var body = JSON.parse(body)
        console.log(body.post)
        console.log(body.comments)

        this.setState({
          post: body.post,
          comments: body.comments
        });
      }.bind(this));
    },

    componentWillUnmount () {
      this.serverRequest.abort();
    },

    render () {
      console.log(this.props.params.postID)

      var commentElement = function(comment){
        return (
          <li key= {comment._id}>
            <Paper style={{marginBottom: 10, display: 'flex'}}>
              <Vote value='1345' />
              <p style={{margin: 0, padding: 20, paddingLeft: 0, flex: 1, wordWrap: 'break-word'}}>
                {comment.body}
              </p>
            </Paper>
          </li>
        )
      }
//           <p>{JSON.stringify(this.state.comments)}</p>

      return (
        <div style={{margin: 1.66 + '%'}}>
          <Card >
            <div style={{display: 'flex'}}>
              <Vote value='1345' />
              <CardTitle
                style={{flex: 1}}
                title={this.state.post.title}
                titleStyle={{fontSize: 17, margin: 0, padding: 0, lineHeight: 22 + 'px'}}
              />
            </div>
            <Divider />
            <CardText>
              {this.state.post.body}
            </CardText>
          </Card>
          <CreateComment postID={this.props.params.postID}/>
          <ul style={ulStyle} >{this.state.comments.map(commentElement.bind(this))}</ul>
        </div>
      )
    }
  })

})
