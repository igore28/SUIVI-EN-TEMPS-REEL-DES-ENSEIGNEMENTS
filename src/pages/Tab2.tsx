import React, { useState, useRef, useEffect } from 'react';
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
  useIonAlert  
} from '@ionic/react';
import axios from 'axios';
import { IonIcon } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import bg1 from '../images/bg.jpg'
import bg2 from '../images/bg2.jpeg'
import bg3 from '../images/bg3.jpg'
import  './Tab1.css';
export default function Tab2() {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }
 const [users, setUsers] = useState([{nom:'',prenoms:'',statut:'',sexe:'',id:'',Email:'',MTRICULE:''}])

 const [Email, setEmail] = useState('')
 const [nom, setNom] = useState('')
 const [prenoms, setPrenoms] = useState('')
 const [statut, setStatut] = useState('')
 const [sexe, setSexe] = useState('')
 const [MTRICULE, setMTRICULE] = useState('')
 const [id, setId] = useState('')

  const [show, setShow] = useState(null)
  const [presentAlert] = useIonAlert();
  const [handlerMessage, setHandlerMessage] = useState('');
  const [roleMessage, setRoleMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
   useEffect(() => {
    fectcUsers()
  },[])
  
 

  const fectcUsers = async ()=>{
    axios.get('http://172.20.10.8:8000/api/utilisateur/').then( async (response)=>{
     await setUsers(response.data)
      setShow(response.data)
    })
  }

    const removeusers = (id:any)=>{
      axios.get('http://172.20.10.8:8000/api/supprimer/'+id).then( async (response)=>{
        
    })
    }

      const handleNom = (e:any)=>{
        console.log(e.target.value)
      }

      const handleOpen = (id:any)=>{
        axios.get('http://172.20.10.8:8000/api/modifier/'+id).then( async (response)=>{
          await setEmail(response.data[0].Email)
          await setNom(response.data[0].nom)
          await setMTRICULE(response.data[0].MTRICULE)
          await setPrenoms(response.data[0].prenoms)
          await setSexe(response.data[0].sexe)
          await setStatut(response.data[0].statut)
          await setId(response.data[0].id)
          
        })
        setIsOpen(true)
      }
 
      const handleUpdate = ()=>{
        axios.get('http://172.20.10.8:8000/api/valider/'+nom+'/'+prenoms+'/'+Email+'/'+MTRICULE+'/'+statut+'/'+sexe+'/'+id).then( async (response)=>{
          console.log(response)
        })
      }

    const modifier = async (id:any)=>{
        
        axios.get('http://172.20.10.8:8000/api/modifier/'+id).then( async (response)=>{
        await setEmail(response.data[0].Email)
        await setNom(response.data[0].nom)
        await setMTRICULE(response.data[0].MTRICULE)
        await setPrenoms(response.data[0].prenoms)
        await setSexe(response.data[0].sexe)
        await setStatut(response.data[0].statut)
        await setId(response.data[0].id)
        
      })
      if(Email != null){
            await presentAlert({
                    header: 'Modifier',
                    buttons: [
                      {
                      text: 'Cancel',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: (blah) => {
                      console.log('Confirm Cancel: blah');
                      }
                      }, {
                      text: 'Okay',
                      handler: () => {
                        let id = document.getElementById('nom')?.getAttribute('placeholder')
                        console.log(id)
                      }
                      }
                      ],
                    inputs: [
                      {
                        placeholder:nom,
                        label:'nom',
                        value:nom,
                        id:'nom'
                      },
                      {
                        placeholder: 'prenoms',
                        label:'prenoms',
                        value:prenoms
                      },

                      {
                        placeholder: 'sexe',
                        label:'sexe',
                        value:sexe
                      },
                      {
                        placeholder: 'Email',
                        label:'Email',
                        value:Email
                      },
                      {
                        placeholder:'statut',
                        label:'statut',
                        value:statut
                      },
                      {
                        placeholder:'MTRICULE',
                        label:'MTRICULE',
                        value:MTRICULE
                      },
                    ],
                  })
      }
     
    }

  return (
    <>
       <div id="carouselExampleIndicators" style={{height:'350px'}} className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" style={{height:'350px'}} src={bg1} alt="First slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" style={{height:'350px'}} src={bg2} alt="Second slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" style={{height:'350px'}} src={bg3} alt="Third slide"/>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
        <IonButton style={{marginTop:10}} id="open-modal" expand="block">
          ENSEIGNANTS
        </IonButton>
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Welcome</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <div className="container-fluid">
	<div className="row">
		<h2>LISTES DES </h2>
        <div className="col-lg-12 mb-4">
            <input  type="search" className="form-control" id="input-search" placeholder="Search Attendees..." />
        </div>
        <div className="searchable-container">
            { show == null ? (<p>Chargement...</p>) :  users.map((item,i)=>{
              {console.log(item.nom)}
        return  (
            
          <div key={i} className="items col-xs-12 col-sm-6 col-md-6 col-lg-6 clearfix"  >
          <div className="info-block block-info clearfix" style={{display:'flex',flexDirection:'row'}}>
              <div className="square-box pull-left">
                    <img src='https://thumbnail.imgbin.com/23/18/15/imgbin-computer-icons-user-profile-avatar-avatar-YEHFztTFuL6f0yfhJTVTknv1G_t.jpg' />
              </div>
            <div>
              <h5>{item.nom} {item.prenoms}</h5>
              <h4>status: {item.statut}</h4>
              <p>sexe: {item.sexe}</p>
            </div>
          </div>
            <IonSegment value="custom">
                <IonSegmentButton onClick={() => handleOpen(item.id)}  value="custom" style={{backgroundColor:'green'}}>
                  <IonLabel style={{color:'green'}} >MODIFIER</IonLabel>
                </IonSegmentButton>
                
                <IonSegmentButton  onClick={() =>
          presentAlert({
            header: 'Voulez vous Supprimer ! ',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Alert canceled');
                },
              },
              {
                text: 'OK',
                role: 'confirm',
                handler: () => {
                  removeusers(item.id)
                },
              },
            ],
            onDidDismiss: (e: CustomEvent) => setRoleMessage(`Dismissed with role: ${e.detail.role}`),
          })
        }  value="custom" style={{backgroundColor:'red'}}>
                  <IonLabel style={{color:'red'}} >SUPPRIMER</IonLabel>
                </IonSegmentButton>
              </IonSegment>
          </div>

  )
    })}
           
            
           
        </div>
	  </div>
    </div>
   </IonContent>
        </IonModal>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>MODIFIER</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
              <div className='form-group mr-4' style={{marginLeft:40}} >
                  <input type='text' onChange={e => setNom(e.target.value)}  className='form-control border border-info' placeholder='nom' value={nom} />
              </div>
              <div className='form-group mr-4' style={{marginLeft:40}} >
                  <input type='text' onChange={e => setPrenoms(e.target.value)}  className='form-control border border-info' placeholder='prenom' value={prenoms} />
              </div>
              <div className='form-group mr-4' style={{marginLeft:40}} >
                  <input type='text' className='form-control border border-info' onChange={e => setEmail(e.target.value)}  placeholder='email' value={Email} />
              </div>
              <div className='form-group mr-4' style={{marginLeft:40}} >
                  <input type='text' className='form-control border border-info' onChange={e => setSexe(e.target.value)}  placeholder='sexe' value={sexe} />
              </div>
              <div className='form-group mr-4' style={{marginLeft:40}} >
                  <input type='text' className='form-control border border-info' placeholder='statut' onChange={e => setStatut(e.target.value)}  value={statut} />
              </div>
              <div className='form-group mr-4' style={{marginLeft:40}} >
                  <input type='text' className='form-control border border-info' placeholder='matricule' onChange={e => setMTRICULE(e.target.value)}  value={MTRICULE} />
              </div>

                <div className='form-group mr-4' style={{marginLeft:40}}>
                  <button onClick={handleUpdate} className='btn btn-info' >MODIFIER</button>
                </div>
              
          </IonContent>
        </IonModal>
    </>
  )
}

