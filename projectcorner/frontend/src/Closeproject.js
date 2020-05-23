import React from 'react';
import {Redirect} from 'react-router-dom';

class Closeproject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done:false,
      status:"",
    }
  }


  componentDidMount(){

        fetch(`http://localhost:8000/projects/api/projects/${this.props.match.params.project_id}/`, {
        method: 'PATCH',
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify( {
                    "is_open":this.props.match.params.status ,
              }),
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
              done:true,
              status:this.props.match.params.status,
          });
        }
        )


  }

  render(){


    //redirect to login if not logged in
    if( localStorage.getItem( 'token') == null){
       return (
         <Redirect
           to={{
             pathname : '/',
             state :  {
               error : "You need to login first"
             }
           }}
           />
       )
    }

      const error_alert =()=>{

          if(this.state.done)
          {
                if(this.props.match.params.status == "true")
                {
                  return(<div class="alert alert-success">Project is Now open</div>)
                }
                else
                {
                   return(<div class="alert alert-warning">Project is Now Closed</div>)
                }

          }
          else{
                  return(<div class="alert alert-danger">couldn't proceed your request</div>)
          }

    }

    return(
      <div>{error_alert()}</div>
    )

  }


}


export default Closeproject;
