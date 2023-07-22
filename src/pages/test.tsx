import React, { useState,useEffect,useRef } from 'react'
import { Redirect, Route } from 'react-router-dom';
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
import axios from 'axios';
import SignatureCanvas from 'react-signature-canvas'
import './test.css';
import img from '../components/loader/l3.gif';
import TabsMenu from './TabsMenu';
export default function Test() {

     const [loader,setLoader] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [datas, setData] = useState('')
    const [idfiche, setIdfiche] = useState('')
    const [fiches, setFiches] = useState({semestre:'',niveau:'',Enseignant:'',salle:'',UE:'',cotenu:'',seance:'',heure_fin:'',heure_debut:'',total_horaire:'',date:'',titre:'',status:"",signature:"",image:""})
     const [isOpen1, setIsOpen1] = useState(false);

     function hello(){
    let idf = localStorage.getItem('idfiche')
    let u = idf  == undefined ? '' : idf
      console.log(u)
        setIdfiche(u)
    }
   const signCanvas = React.useRef() as React.MutableRefObject<any>;
    useEffect(() => {
      hello()
      handleItem(localStorage.getItem('idfiche'))
      
    },[])
    

    const handleItem = (idf:any)=>{
      axios.get('http://127.0.0.1:8000/api/fiches/'+idf).then( async (response)=>{
        console.log(response)
        setFiches(response.data[0])
         })
      }

      const clear = () => signCanvas.current.clear();

     const save = () =>{
           //setData(signCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
           setData(signCanvas.current.toDataURL());

     }


     const saves = () =>{
      setLoader(true)
      console.log(datas)
       setData(signCanvas.current.toDataURL());

      let data = new FormData()
    data.append('file',datas)
    
    axios.post('http://127.0.0.1:8000/api/uploads_signature/'+idfiche,data).then((response)=>{
         console.log(response)
         setIsOpen(false)
         setTimeout(()=>{
        setLoader(false)
        },5000)
          setIsOpen1(true)
        })
     }
     
if(loader == true){
    return (
      <> 
<div className="wrapper fadeInDown">
        <div id="formContent">
        <img src={img} id="icon" style={{width:400}} alt="User Icon" />
      <p style={{width:400,color:"slateblue",fontSize:20, fontFamily:"Maiandra GD"}} >Signature Fiche ....</p>
        </div>
    </div>
  </> 
      )
  }else {
    return (
      <IonContent>
      <div id="course-left-sidebar" className="col-md-3">
        <div className="course-image-widget">
        <img src={"http://127.0.0.1:8000/uploads/"+fiches.image} alt="" className="img-responsive"/>
        </div>
        <div className="course-meta">
        <p>{fiches.UE}</p>
        <hr/>
        <p>SEMESTRE <small style={{width:90}}  className="label label-primary">{fiches.semestre}</small></p>
        <hr/>
        <p>NIVEAU<small style={{width:90}}  className="label label-primary">{fiches.niveau}</small></p>
        <hr/>
        <p>Enseignant<small style={{width:90}} className="label label-primary">{fiches.Enseignant}</small></p>
        <hr/>
        <p>UE <small style={{width:90}}  className="label label-primary"><a href="course-achievements.html">{fiches.UE}</a></small></p>
        <hr/>
        <p>SALLE <small style={{width:90}}  className="label label-primary"><a href="#">{fiches.salle}</a></small></p>
        <hr/>
        <p>HEURE DEBUT <small style={{width:90}}  className="label label-primary"><a href="#">{fiches.heure_debut}</a></small></p>
        <hr/>
        <p>HEURE DEBUT <small style={{width:90}}  className="label label-primary"><a href="#">{fiches.heure_debut}</a></small></p>
        <hr/>
        <p>HEURE FIN <small style={{width:90}}  className="label label-primary"><a href="#">{fiches.heure_fin}</a></small></p>
        <hr/>
        <p>HEURE TOTAL <small style={{width:90}}  className="label label-primary"><a href="#">{fiches.total_horaire}</a></small></p>
        <hr/>
        <p>DATE<small style={{width:90}}  className="label label-primary"><a href="#">{fiches.date}</a></small></p>
        </div>
        </div>

        <div id="course-content" className="col-md-9">

<div className="course-description">
<h3 className="course-title">CONTENU</h3>
<p>{fiches.cotenu}<hr/>
    {
       fiches.signature == null ? (<a className="btn btn-info text-uppercase" onClick={()=>{setIsOpen(true)}} >valider fiche </a>) : null
    }
</p>

</div>
</div>

  <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Fiche </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>FERMER </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
     
        <IonContent className=""> 
            <div className='container-fluid' style={{marginLeft:'5px',border:"1px solid #eee"}} >
                <SignatureCanvas ref={signCanvas} penColor='green' canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
              </div>
                <IonButton onClick={clear} >EFFACER</IonButton>
                <IonButton onClick={save} >en</IonButton>
                <IonButton onClick={saves} >VALIDER</IonButton>
      </IonContent>
        </IonModal>

        <IonAlert
        isOpen={isOpen1}
        header="Alert"
        subHeader="Important message"
        message="FICHE VALIDER AVEC SUCCÈS "
        buttons={[
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
             setIsOpen(false)
            },
          },
        ]}
        onDidDismiss={() => setIsOpen1(false)}
      ></IonAlert>
</IonContent>

          )
    
  }
}


    