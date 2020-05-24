import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import Navigationbar from './Navigationbar'
import {Redirect}  from 'react-router-dom';
class ContentsApplicants extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded : "a",
      items :[],
    }

  }

  componentDidMount() {
    this.fetchdata()
  }

   fetchdata(){

     let url2 = "http://127.0.0.1:8000/projects/api/applications/?project_id="+this.props.match.params.project_id
     fetch(url2, {headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`

        }})
       .then(res => res.json())
       .then(
         (result) => {
           this.setState({
             isLoaded: "b",
             items: result
           })
         },
       )
   }

   render(){

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


     return(
       <div>
        <Navigationbar />
       <div class="container">
       <Header content="Applicants" />
       {this.state.items.map(item =>(
           <div class="card" >
              <div class="card-body">
                <h4 class="card-title">{item.name}</h4>
                <p class="card-text">{item.enrollment_id}</p>
                <p class="card-text"><b>Department: </b>{item.department}</p>
                <div class="card-text"><b>Grade: </b>{item.cgpa}</div>
                <br/>
              </div>
            </div>
       ))}

       </div>
     </div>
     )
   }

}


export default ContentsApplicants
