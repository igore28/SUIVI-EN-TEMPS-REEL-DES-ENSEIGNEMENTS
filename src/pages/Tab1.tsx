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
  useIonAlert,
  IonMenu,
  IonMenuButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonAlert,
  IonList,
  IonAvatar,
  IonImg,
  createAnimation,
  IonBadge,
  IonSplitPane  
} from '@ionic/react';
import axios from 'axios';
import $ from 'jquery';
import { IonIcon } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import bg1 from '../images/bg.jpg'
import bg2 from '../images/bg2.jpeg'
import bg3 from '../images/bg3.jpg'
import TabsMenu from './TabsMenu';
import  './Tab1.css';
export default function Tab1() {
  const modal = useRef<HTMLIonModalElement>(null);
  const modal50 = useRef<HTMLIonModalElement>(null);
  const modal2 = useRef<HTMLIonModalElement>(null);
  const modal3 = useRef<HTMLIonModalElement>(null);
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
 const [enseignants, setEnseignant] = useState([{nom:'',prenoms:'',statut:'',sexe:'',id:'',Email:'',MTRICULE:''}])
 const [etudiant, setEtudiant] = useState([{nom:'',prenoms:'',statut:'',sexe:'',id:'',Email:'',MTRICULE:''}])

 const [Email, setEmail] = useState('')
 const [nom, setNom] = useState('')
 const [prenoms, setPrenoms] = useState('')
 const [statut, setStatut] = useState('')
 const [sexe, setSexe] = useState('')
 const [MTRICULE, setMTRICULE] = useState('')
 const [id, setId] = useState('')

 const [count, setCount] = useState(0)
 const [countA, setCountA] = useState(0)

  const [show, setShow] = useState(null)
  const [show2, setShow2] = useState(null)
  const [show3, setShow3] = useState(null)
  const [presentAlert] = useIonAlert();
  const [handlerMessage, setHandlerMessage] = useState('');
  const [roleMessage, setRoleMessage] = useState('');
  const [not, setNot] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [storage, setStorage] = useState('')
  const [local, setLocal] = useState('')
  const [locals, setLocals] = useState(false)
const [cour, setCours] = useState([{nom:'',heure:'',idniveau:'',date_j:''}])
const [isOpen55, setIsOpen55] = useState(false);
   useEffect(() => {
    fectcUsers()
    fectcEnseignants()
    fectcEtudiants()
    fetchUser()
    select_user(local)
   fectcNotif()
   fectcNotifications()
   fectcSemestreA()

   $("#search-user").on("keyup",function() {
            var value = $("#search-user").val();
            axios.get('http://127.0.0.1:8000/api/utilisateurv/'+value).then( async (response)=>{
           await setUsers(response.data)
    })
        });

   $("#search-etu").on("keyup",function() {
            var value = $("#search-etu").val();
            axios.get('http://127.0.0.1:8000/api/etudiantsv/'+value).then( async (response)=>{
           await setEtudiant(response.data)
    })
        });

   $("#search-ens").on("keyup",function() {
            var value = $("#search-ens").val();
            axios.get('http://127.0.0.1:8000/api/enseignantsv/'+value).then( async (response)=>{
           await setEnseignant(response.data)
    })
        });
  },[])
  
  const closeM = ()=>{
    axios.get('http://127.0.0.1:8000/api/notification/'+localStorage.getItem('nomNotif')).then(async (response)=>{
     console.log(response)
    })
    modal50.current?.dismiss()


  }

  const fectcUsers = async ()=>{
    axios.get('http://127.0.0.1:8000/api/utilisateur/').then( async (response)=>{
     await setUsers(response.data)
      setShow(response.data)
    })
  }

  const fectcNotifications = async ()=>{
    axios.get('http://127.0.0.1:8000/api/notificationes/'+localStorage.getItem('nomNotif')).then( async (response)=>{
       console.log(response.data[0])
        setNot(response.data[0].data)
        setCount(0)
        let newcount = count + 1
        setCount(newcount)
    })
  }

   const fectcNotif = async ()=>{

      if(localStorage.getItem('statut') == 'ENSEIGNANT'){
          axios.get('http://127.0.0.1:8000/api/name/'+localStorage.getItem('user')).then( async (response)=>{
            let datas = response.data[0]
            localStorage.setItem('nomNotif',datas.nom)
          
              axios.get('http://127.0.0.1:8000/api/notifs/'+datas.nom).then( async (response)=>{
                console.log(response)
                if (response.data.messages == 'error') {
                  
                }else{
                  setCours(response.data)
                  setIsOpen55(true)
                }
              
              

        })

        })
      }
  
  }

        const fectcSemestreA = async ()=>{
    axios.get('http://127.0.0.1:8000/api/alerteC/'+localStorage.getItem('statut')).then( async (response)=>{
      console.log(response.data)
     await setCountA(response.data.countalert)
      
    })
    }

  const showAlert = ()=>{
    cour.map((cour)=>{
      return `vous avez cour le `+cour.date_j +` a `+cour.heure+` a `+cour.idniveau
    })
  } 

  function dismiss() {
    modal.current?.dismiss();
  }

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction('reverse');
  };

  const fectcEnseignants = async ()=>{
    axios.get('http://127.0.0.1:8000/api/enseignant/').then( async (response)=>{
     await setEnseignant(response.data)
      setShow2(response.data)
    })
  }

  const fectcEtudiants = async ()=>{
    axios.get('http://127.0.0.1:8000/api/etudiants/').then( async (response)=>{
     await setEtudiant(response.data)
      setShow3(response.data)
    })
  }

    const removeusers = (id:any)=>{
      axios.get('http://127.0.0.1:8000/api/supprimer/'+id).then( async (response)=>{
        console.log(response)
    })
    }

    const fetchUser = ()=>{
      let user = localStorage.getItem('user')
      let u = user  == undefined ? '' : user
       setLocal(u)
       console.log(u)
    }

    const select_user = (local:any)=>{
      axios.get('http://127.0.0.1:8000/api/user/'+local).then( async (response)=>{
        console.log(response.data[0].statut)
        setLocals(true)
        setStorage(response.data[0].statut)
    })
    }

      const handleNom = (e:any)=>{
        console.log(e.target.value)
      }

      const handleOpen = (id:any)=>{
        axios.get('http://127.0.0.1:8000/api/modifier/'+id).then( async (response)=>{
          await setEmail(response.data[0].Email)
          await setNom(response.data[0].nom)
          await setMTRICULE(response.data[0].MTRICULE)
          await setPrenoms(response.data[0].prenoms)
          await setSexe(response.data[0].sexe)
          await setStatut(response.data[0].statut)
          await setId(response.data[0].id)
          
        })
        setIsOpen(true)
        setIsOpen2(true)
        setIsOpen3(true)
      }
 
      const handleUpdate = ()=>{
        axios.get('http://127.0.0.1:8000/api/valider/'+nom+'/'+prenoms+'/'+Email+'/'+MTRICULE+'/'+statut+'/'+sexe+'/'+id).then( async (response)=>{
          console.log(response)
        })
      }

    const modifier = async (id:any)=>{
        
        axios.get('http://127.0.0.1:8000/api/modifier/'+id).then( async (response)=>{
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
    <IonSplitPane>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>
    </IonSplitPane>


      <IonPage id="main-content white section" style={{backgroundColor:'#fff'}} >
        <IonContent className="white section">
          <p style={{position:'absolute',top:100,zIndex:1000,left:80,color:'red',fontSize:40}}>{localStorage.getItem('statut')}</p>
       <div id="carouselExampleIndicators" style={{height:'350px'}} className="carousel slide" data-ride="carousel">
       
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
          UTILISATEURS
        </IonButton>
        <IonButton style={{marginTop:10}} id="open-modal-ens" expand="block">
          ENSEIGNANTS
        </IonButton>
        <IonButton style={{marginTop:10}} id="open-modal-etudiant" expand="block">
          ETUDIANT
        </IonButton>
        <IonButton style={{marginTop:10}} id="" slot='start' expand="block">
          ETUDIANT
        </IonButton>
       
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>RETOUR</IonButton>
              </IonButtons>
              <IonTitle>UTILISATEUR</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  { localStorage.getItem('statut') == 'CD' ? (<i className="fa fa-add"></i>) : null }
                
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <div className="container-fluid">
  <div className="row white section myTable">
    <h2>LISTES DES UTILISATEURS</h2>
        <div className="col-lg-12 mb-4">
            <input  type="search" className="form-control" id="search-user" placeholder="Search Attendees..." />
        </div>
        <div className="searchable-container">
            { show == null ? (<p>Chargement...</p>) :  users.map((item,i)=>{
              
        return  (
            
          <div key={i} className="items col-xs-12 col-sm-6 col-md-6 col-lg-6 clearfix"  >
          <div className="info-block block-info clearfix" style={{display:'flex',flexDirection:'row'}}>
              <div className="square-box pull-left">
                    <img src='https://thumbnail.imgbin.com/23/18/15/imgbin-computer-icons-user-profile-avatar-avatar-YEHFztTFuL6f0yfhJTVTknv1G_t.jpg' />
              </div>
            <div>
              <h5>{item.nom} {item.prenoms}</h5>
              <h4>status: {item.statut} </h4>
              <h4>sexe: {item.sexe}</h4>
            </div>
          </div>
            <IonSegment value="custom">
              {localStorage.getItem('statut') == 'CD' ? (<IonSegmentButton onClick={() => handleOpen(item.id)}  value="custom" 
                style={{backgroundColor:''}}>
                  <IonLabel style={{color:'green'}} >MODIFIER</IonLabel>
                </IonSegmentButton>) : null }
                
                
                {localStorage.getItem('statut') == 'CD' ? (<IonSegmentButton  onClick={() =>
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
        }  value="custom" style={{backgroundColor:''}}>
                  <IonLabel style={{color:'red'}} >SUPPRIMER</IonLabel>
                </IonSegmentButton>) : null }

                
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
                  <input type='text' onChange={e => setNom(e.target.value)}  
                  className='form-control border border-info' placeholder='nom' value={nom} />
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


        <IonModal ref={modal2} trigger="open-modal-ens" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal2.current?.dismiss()}>RETOUR</IonButton>
              </IonButtons>
              <IonTitle>ENSEIGNANTS</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                { localStorage.getItem('statut') == 'CD' ? (<i className="fa fa-add"></i>) : null }
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <div className="container-fluid white section">
  <div className="row">
    <h2>LISTES DES ENSEIGNANTS</h2>
        <div className="col-lg-12 mb-4">
            <input  type="search" className="form-control" id="search-ens" placeholder="Search Attendees..." />
        </div>
        <div className="searchable-container">
            { show2 == null ? (<p>Chargement...</p>) :  enseignants.map((item,i)=>{
              
        return  (
            
          <div key={i} className="items col-xs-12 col-sm-6 col-md-6 col-lg-6 clearfix"  >
          <div className="info-block block-info clearfix" style={{display:'flex',flexDirection:'row'}}>
              <div className="square-box pull-left">
                    <img src='https://thumbnail.imgbin.com/23/18/15/imgbin-computer-icons-user-profile-avatar-avatar-YEHFztTFuL6f0yfhJTVTknv1G_t.jpg' />
              </div>
            <div>
              <h5>{item.nom} {item.prenoms}</h5>
              <h4>status: {item.statut}</h4>
              <h4>sexe: {item.sexe}</h4>
            </div>
          </div>
          {localStorage.getItem('statut') == 'CD' ? (<IonSegment value="custom">
                <IonSegmentButton onClick={() => handleOpen(item.id)}  value="custom" >
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
        }  value="custom">
                  <IonLabel style={{color:'red'}} >SUPPRIMER</IonLabel>
                </IonSegmentButton>
              </IonSegment>) : null }
     
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




        <IonModal ref={modal3} trigger="open-modal-etudiant" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal3.current?.dismiss()}>RETOUR</IonButton>
              </IonButtons>
              <IonTitle>ETUDIANTS</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                { localStorage.getItem('statut') == 'CD' ? (<i className="fa fa-add"></i>) : null }
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <div className="container-fluid white section">
  <div className="row">
    <h2>LISTES DES ETUDIANTS</h2>
        <div className="col-lg-12 mb-4">
            <input  type="search" className="form-control" id="search-etu" placeholder="Search Attendees..." />
        </div>
        <div className="searchable-container">
            { show3 == null ? (<p>Chargement...</p>) :  etudiant.map((item,i)=>{
           
        return  (
            
          <div key={i} className="items col-xs-12 col-sm-6 col-md-6 col-lg-6 clearfix"  >
          <div className="info-block block-info clearfix" style={{display:'flex',flexDirection:'row'}}>
              <div className="square-box pull-left">
                    <img src='https://thumbnail.imgbin.com/23/18/15/imgbin-computer-icons-user-profile-avatar-avatar-YEHFztTFuL6f0yfhJTVTknv1G_t.jpg' />
              </div>
            <div>
              <h5>{item.nom} {item.prenoms}</h5>
              <h4>status: {item.statut}</h4>
              <h4>sexe: {item.sexe}</h4>
            </div>
          </div>
          {
            localStorage.getItem('statut') == 'CD'  ? ( <IonSegment value="custom">
                <IonSegmentButton onClick={() => handleOpen(item.id)
                }  value="custom" >
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
        }  value="custom" >
                  <IonLabel style={{color:'red'}} >SUPPRIMER</IonLabel>
                </IonSegmentButton>
              </IonSegment>) : null}
           
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
                   <span className='icon' style={{color:"white"}} >
                     <i className="fa fa-bell"></i>
                    { countA > 0 ? ( <span className="badge bg-danger boder-50" >{countA}</span>) : null }
                   </span>
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

        </IonContent>
      </IonPage>

      <IonModal
          id="example-modal"
          isOpen={isOpen55}
          ref={modal50}
          trigger="open-modal50"
          enterAnimation={enterAnimation}
          leaveAnimation={leaveAnimation}
        >
          <IonContent>
            <IonToolbar>
              <IonTitle>ALERT</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={closeM}>OK</IonButton>
              </IonButtons>
            </IonToolbar>
            <IonList>
           { cour.map((item)=>{
                    return (
                    <IonItem>
                      <IonLabel>
                        <h2 style={{fontWeight:'bold',color:'#000'}} >vous avez cour le</h2>
                        <p>{item.date_j +` a `+item.heure+` a `+item.idniveau}</p>
                      </IonLabel>
                  </IonItem>
                    )
                  })
            }
              
            </IonList>
          </IonContent>
        </IonModal>
    </>
  )



}


