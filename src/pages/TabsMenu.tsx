import React,{useEffect,useState} from 'react'
import { Redirect, Route } from 'react-router-dom';
import {
	IonButtons,
	IonLabel,
	IonModal,
	IonHeader,
	IonContent,
	IonToolbar,
	IonTitle,
	IonPage,
	IonItem,
	IonButton,
	IonInput, 
	IonSegment, 
	IonSegmentButton,
	useIonAlert,
	IonSelect, IonSelectOption,
	IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonList,IonAvatar,IonImg,IonIcon,IonActionSheet,useIonActionSheet,IonAlert  
  } from '@ionic/react';
  import axios from 'axios';
  import './menu.css';
  import { OverlayEventDetail } from '@ionic/core/components';
  import { useHistory,useLocation } from "react-router-dom";

export default function TabsMenu() {
    let history = useHistory();
    
     const [present] = useIonActionSheet();
     const habdlehistory = ()=>{
      history.push('alert')
     }

  return (
    <>
      <div className='navigation' style={{position:'fixed',bottom:0}}>
         <ul>
           <li  className='list activ' >
             <a href='tab1' >
               <span className='icon' style={{color:"white"}} ><i className="fa fa-home" style={{}} ></i></span>
               <span className='test text-uppercase' style={{color:"white"}}  >Acceuil</span>
             </a>
           </li>
           <li className='list' >
             <a href='tab3' >
               <span className='icon'  style={{color:"white"}} ><i className="fa fa-book"></i></span>
               <span className='test text-uppercase' style={{color:"white",marginTop:'5px'}}  >Fiches</span>
             </a>
           </li>
           <li className='list' >
             <a href='alert' >
               <span className='icon' style={{color:"white"}} ><i className="fa fa-bell"></i><span className="badge bg-danger boder-50" >1</span></span>
               <span className='test text-uppercase' style={{color:"white",marginTop:'5px'}} >Alert </span>
             </a>
           </li>
           <li className='list' >
             <a href='fiche' >
               <span className='icon' style={{color:"white"}} ><i className="fa fa-file-text"></i></span>
               <span className='test text-uppercase' style={{color:"white",marginTop:'5px'}} >Emmargement</span>
             </a>
           </li> 
         </ul>
      </div>
    </>
  )
}

