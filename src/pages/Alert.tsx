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
  import './alert.css';
  import TabsMenu from './TabsMenu';
  import './menu.css';
  import { MultiSelect } from "react-multi-select-component";

export default function Test() {
     function hello(){
       //location.href = 'tata'
    }
    const [cour, setCours] = useState([{nom:'',heure:'',idniveau:'',date_j:''}])
    const [count, setCount] = useState(0)
    useEffect(() => {
      fectcSemestreA()
      fectcSemestreV()
    }, [])
  const [enseignantsA, setEnseignantsA] = useState([{"id":"","destinataire":"","date_j":"","comment":"",titre:"",send:''}]);


      const fectcSemestreA = async ()=>{
    axios.get('http://127.0.0.1:8000/api/alerteC/'+localStorage.getItem('statut')).then( async (response)=>{
      console.log(response.data)
     await setEnseignantsA(response.data.alert)
     await setCount(response.data.countalert)
      
    })
    }

     const fectcSemestreV = async ()=>{
    axios.get('http://127.0.0.1:8000/api/alerteV/'+localStorage.getItem('statut')).then( async (response)=>{
      console.log(response.data)
      
    })
    }

  const [nom, setNom] = useState();
  const [nens, setNens] = useState('');
  const [nue, setNue] = useState('');
  const [ndate, setNdate] = useState('');
  const [ncomment, setNcomment] = useState('');
  const [niveau, setNiveau] = useState('');
  const [isOpen1, setIsOpen1] = useState(false);
  const [notification, setNotification] = useState(false);

   const [nensS, setNensS] = useState([{nom:'',id:''}]);
 
   const [selected, setSelected] = useState([]);
   const [options, setOptions] = useState([
  { label: "", value: "" },
]);
    
    const fectcNotifications = async ()=>{
      axios.get('http://172.20.10.8:8000/api/notificationes/'+localStorage.getItem('nomNotif')).then( async (response)=>{
        console.log(response.data[0].data)
        axios.get('http://172.20.10.8:8000/api/notifAs/'+response.data[0].data).then( async (response)=>{
          console.log(response.data)
          if (response.data.messages == 'error') {
            
          }else{
            setCours(response.data)
          }
  })    
      })
    }

   const handleAlert = (e:any)=>{
          e.preventDefault()
          console.log(options)
          options.map((item)=>{
           axios.get('http://127.0.0.1:8000/api/alertpl/'+niveau+'/'+nue+'/'+ndate+'/'+ncomment+'/'+localStorage.getItem('statut')+'/'+item.label+'/'+localStorage.getItem('statutd')).then((response)=>{
        console.log(response)
        setNue('')
        setNcomment('')
        setNiveau('')
        setNens('')
        setIsOpen1(true)
        })
          })
        /*  axios.get('http://127.0.0.1:8000/api/alertp/'+nens+'/'+nue+'/'+ndate+'/'+ncomment).then((response)=>{
        console.log(response)
        setNue('')
        setNue('')
        setNue('')
        setNens('')
        setIsOpen1(true)
        })*/
    }

    
       const handleChangeStatus = (e:any)=>{
          setNiveau(e.target.value)
          axios.get('http://127.0.0.1:8000/api/showStatus/'+e.target.value).then((response)=>{
        console.log(response.data)
        setOptions(response.data)
      
        })
    }

    const handleChangeNom = (e:any)=>{
          console.log(e)
    }

     const handleNews = (e:any)=>{
        console.log(e)
    }

  return (
    <>
        <IonContent className="fadeInDown ">
              <section className="white section">
                  <div className="container">
                  <div className="row contact-wrapper">
                  <div className="col-md-9 col-sm-9 col-xs-12 content-widget">

                  <div className="widget-title" style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}} >
                  <h4 onClick={()=>setNotification(false)} className={notification ? '' : 'actions' } >send </h4>
                  <h4 onClick={()=>setNotification(true)} className={!notification ? '' : 'actions' } >Notification </h4>
                  
                  </div>
                  {
                    notification ? (

                      <div className="white section" style={{marginTop:0,width:'100%'}} >
                                {
                enseignantsA.map((item) => {
                              return (
                                 <>
                                   <p style={{color:'#000'}} >
                                      {item.titre} notification Envoyer par le 
                                      <em style={{textDecoration:'underline'}} >  {item.send}</em><br />
                                       le <span style={{color:'#338890'}} >{item.date_j}</span><br />
                                       <strong style={{color:'#2a0e15'}} >{item.comment}</strong><br />
                                   </p>
                                   <hr style={{width:'97%'}} />
                                 </> 
                              )
                            })
                          }
                              
                      </div>

                      ) : (

                            <div id="contact_form" className="contact_form row">
                  <div id="message"></div>
                  <form id="contactform" action="http://templatevisual.com/demo/learnplus/contact.php" name="contactform" method="post">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <select value={niveau} 
                                onChange={(e)=>handleChangeStatus(e)} 
                                style={{width:"100%"}} 
                                className="form-control" 
                                id="exampleFormControlSelect1">
                            <option value='0' >SELECT STATUS</option>
                            {
                              localStorage.getItem('statut') != 'CD' ? (<option value='CD' >CHEF DEPARTEMENT</option>) : (<option value='DELEGUE' >DELEGUE</option>)
                            }
                            <option value='ENSEIGNANT' >ENSEIGNANT</option>
                        </select>
                      
                      <div>
                        <h1>Select Users</h1>
                        <MultiSelect
                        className='text-info'
                          options={options}
                          value={selected}
                          onChange={setSelected}
                          labelledBy="Select Users"
                        />
                      </div>
                  
                  <input type="text" name="email"  onChange={(e)=>{setNue(e.target.value)}}  id="email" style={{width:"100%"}} value={nue} className="form-control" placeholder="Titre  *"/>
                  <input type="date" name="name"  onChange={(e)=>{setNdate(e.target.value)}}  id="website" style={{width:"100%"}} value={ndate} className="form-control" placeholder="Date "/>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <textarea className="form-control" value={ncomment} onChange={(e)=>{setNcomment(e.target.value)}} name="comments" id="comments"  placeholder="commentaire"></textarea>
                  <button type="submit" onClick={(e)=>{handleAlert(e)}} value="SEND" id="submit" className="btn btn-primary btn-block">Envoyer </button>
                  </div>
                  </form>
                  </div>
                        )
                  }
                  

                  </div>
                  
                  </div>
                  </div>
              </section>
          

           <IonAlert
        isOpen={isOpen1}
        header="Important message"
        message="message Envoyer avec success "
        buttons={[
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {

            },
          },
        ]}
        onDidDismiss={() => setIsOpen1(false)}
      ></IonAlert>
     <>
      <div className='navigation' style={{position:'fixed',bottom:0}}>
         <ul>
           <li  className='list' >
             <a href='tab1' >
               <span className='icon'  style={{color:"white"}} ><i className="fa fa-home"></i></span>
               <span className='test'  style={{color:"white"}}  >Acceuil</span>
             </a>
           </li>
           <li className='list' >
             <a href='tab3' >
               <span className='icon' style={{color:"white"}} ><i className="fa fa-book"></i></span>
               <span className='test' style={{color:"white"}} >Fiches</span>
             </a>
           </li>
           <li className='list activ' >
             <a href='alert ' >
               <span className='icon'  style={{color:"white"}} ><i className="fa fa-bell"></i></span>
               <span className='test'  style={{color:"white"}} >Alert</span>
             </a>
           </li>
           <li className='list' >
             <a href='fiche' >
               <span className='icon' style={{color:"white"}} ><i className="fa fa-file-text"></i></span>
               <span className='test' style={{color:"white"}} >Emmargement</span>
             </a>
           </li>
         </ul>
      </div>
    </>
    </IonContent>
      
    </>
  )
}

