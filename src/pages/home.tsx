import React,{useEffect} from 'react' 
import { useHistory,useLocation } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import { Button, Grid } from 'semantic-ui-react'
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel, 
  IonInput, 
  IonSegment, 
  IonSegmentButton,
  useIonAlert,IonMenu,IonMenuButton,IonTabBar,IonTabButton,IonTabs,IonList,IonAlert  
} from '@ionic/react';
export default function Home() {

  let history = useHistory();

  useEffect(() => {
     let user = localStorage.getItem('user')
     if (user != null) {
      //history.push('tab1')
     }
  })
  
  return (
  <IonContent className="" >
          <section className="white section">
          <div className="container">
          <div className="row">
          <div className="col-md-6">
          <div className="media-element">
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner" role="listbox">
          <div className="item active">
          <img src="upload/xabout_01.jpg.pagespeed.ic.kjNqMAPXcG.jpg" alt="" className="img-responsive"/>
          </div>
          <div className="item">
          <img src="upload/xabout_02.jpg.pagespeed.ic.D36tpcmMNB.jpg" alt="" className="img-responsive"/>
          </div>
          </div>
          <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
          <span className="fa fa-angle-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
          <span className="fa fa-angle-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
          </a>
          </div>
          </div>
          </div>
          <div className="col-md-6">
          <div className="content-widget">
          <div className="widget-title">
          <h4 style={{color:'#000'}} >Bienvenue  sur  ICT-COURSE</h4>
          <hr style={{color:'#210b3a',borderColor:'#3b4cb3'}} />
          </div>
          <p style={{color:'#000'}} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the, when an unknown printer took industry. Lorem Ipsum has been the industry's standard dummy text ever since the, when an unknown printer took...</p>
          <div className="row">
          <div className="col-md-6">
          <ul className="check">
          <li style={{color:'#000'}} >Professional Teachers</li>
          <li style={{color:'#000'}} >24/7 Online Course</li>
          <li style={{color:'#000'}} >Works with All Devices</li>
          <li style={{color:'#000'}} >Friendly User Panel</li>
          <li style={{color:'#000'}} >Support Desk for All Prices</li>
          </ul>
          </div>
          <div className="col-md-6">
          <hr style={{color:'#210b3a',borderColor:'#3b4cb3'}} className="invis1"/>
          <h4 style={{color:'#000'}} > <a href="login" className='btn btn-primary' > Commencer </a></h4>
          </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          </section>
</IonContent>
  )
}
