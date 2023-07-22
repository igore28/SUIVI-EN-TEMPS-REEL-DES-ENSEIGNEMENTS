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
  import { IonDatetime, IonDatetimeButton } from '@ionic/react';
  import axios from 'axios';
  import $ from 'jquery';
  import imges from '../components/loader/l5.gif';
  //import $ from 'jquery';
  import { personCircle } from 'ionicons/icons';
  import React, { useState, useRef, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { OverlayEventDetail } from '@ionic/core/components';
import { useHistory,useLocation } from "react-router-dom";
import img2 from '../components/loader/l4.gif';
const Tab3: React.FC = () => {
	const modal = useRef<HTMLIonModalElement>(null);
	const modal2 = useRef<HTMLIonModalElement>(null);
	const modal3 = useRef<HTMLIonModalElement>(null);
	const input = useRef<HTMLIonInputElement>(null);
	const input2 = useRef<HTMLIonInputElement>(null);
	const [niveaux, setNiveaux] = useState([{nom:'',id:''}])
	const [semestre, setSemestre] = useState([{nom:'',id:'',titre:''}])
	const [show, setShow] = useState(null)
	const [show4, setShow4] = useState(null)
	const [show5, setShow5] = useState(null)
	const [show2, setShow2] = useState(null)
	const [show3, setShow3] = useState(null)
	const [isOpen, setIsOpen] = useState(false);
	const [niveau, setNiveau] = useState('');
	const [semestres, setSemestres] = useState('');
	const [date, setDate] = useState('');
	const [ht, setHt] = useState('');
	const [nc, setNc] = useState('');
	const [heure, setHeure] = useState('');

	const [nens, setNens] = useState('');
	const [nue, setNue] = useState('');
	const [ndate, setNdate] = useState('');
	const [ncomment, setNcomment] = useState('');
	const [isOpen1, setIsOpen1] = useState(false);

	const [enseignants, setEnseignants] = useState([{nom:'',id:'',prenom:''}]);
	const [enseignant, setEnseignant] = useState(null);
	const [imageInfos, setImageInfos] = useState([]);
	const [currentFile, setCurrentFile] = useState(undefined);
	const [previewImage, setPreviewImage] = useState(undefined);

	const [isOpen_stat, setIsOpenStat] = useState(false);

	const [active, setActive] = useState("all");

	const [zoom, setZoom] = useState(false);
	const [loaderImg, setLoaderImg] = useState(false);
	const [message, setMessage] = useState(
	  'This modal example uses triggers to automatically open a modal when the button is clicked.'
	);
	const [image, setImage] = useState('undefined')
     const [images, setImages] = useState([{image:''}])
     const [shows, setShows] = useState(false)


	 const getImage = ()=>{
		axios.get('http://127.0.0.1:8000/api/uploads/').then((response)=>{
			   console.log(response)
			   setImages(response.data.datas)
			   setShows(true)
			  })
	   }

	      const handleClose_stat = ()=>{
		setIsOpenStat(false)
	  }


	      const handleAlert = (e:any)=>{
	      	e.preventDefault()

					axios.get('http://127.0.0.1:8000/api/alert/'+nens+'/'+nue+'/'+ndate+'/'+ncomment).then((response)=>{
			  console.log(response)
			  setIsOpen1(true)
			  })
	  }

	const [selectedFile, setSelectedFile] = React.useState(null);
	const [present] = useIonActionSheet();
	const modal_niveau = useRef<HTMLIonModalElement>(null);
	let history = useHistory();
	const handleSubmit = async(event:any) => {
		setSelectedFile(event.target.files[0])
		const formData = new FormData();
		formData.append("selectedFile", event.target.files[0]);
		try {
		  const response = await axios({
			method: "post",
			url: "http://127.0.0.1:8000/api/upload/",
			data: formData,
			headers: { "Content-Type": "multipart/form-data" },
		  });
		} catch(error) {
		  console.log(error)
		}
	  }

	  function readURL(input:any) {
		console.log(input)
		if (input.files && input.files[0]) {
	  
		  var reader = new FileReader();
	  
		  reader.onload = function(e:any) {
			$('.image-upload-wrap').hide();
	  
			$('.file-upload-image').attr('src', e.target.result);
			$('.file-upload-content').show();
	  
			$('.image-title').html(input.files[0].name);
		  };
	  
		  reader.readAsDataURL(input.files[0]);
	  
		} 
	  }

	  const handlezoom = ()=>{
		setZoom(true)
	  }

	  const handleClose = ()=>{
		setZoom(false)
		modal.current?.dismiss()
	  }

	    const handleClose3 = ()=>{
		setZoom(false)
		modal3.current?.dismiss()
	  }

  function dismiss() {
    modal_niveau.current?.dismiss();
  }
  const [result, setResult] = useState<OverlayEventDetail>();
  const [nom, setNom] = useState('')
  const [titre, setTitre] = useState('')
  const [idniveau1, setidniveau] = useState('')
  const [idsemestre1, setidSemestre] = useState('')
  const [img, setImg] = useState('')

  const [fiches, setid] = useState([{"id":'',"semestre":"",status :"","UE":"","Enseignant":"","salle":"","seance":"","titre":"","cotenu":"","date":"","updated_at":"","created_at":"","niveau":"","heure_fin":"","heure_debut":"","total_horaire":null,"idcour":'',"image":''}])
  const [cours, setCours] = useState([{nom:'',titre:'',idniveau:'',idsemestre:'',id:'',enseignant:'',date_j:''}])
   const [loader,setLoader] = useState(true)
		const handletitre = ()=>{
			console.log(input2.current)
		}
		const afficheFiche = ()=>{
			
		}

	useEffect(() => {
		fectcNiveaux()
		fectcSemestre()
		fectcEnseignants()
		getImage()
		setTimeout(()=>{
        setLoader(false)
    },10000)
	  },[])



	 const handleImg = (img:any)=>{
		setImg(img)
		setZoom(true)
	 }
  
	   const handechange = (e:any,idf:any)=>{
	   	setLoaderImg(true)
		const imageArray = []
		let isValid = '';
		  for(let i=0; i<e.target.files.length;i++){
		  imageArray.push(e.target.files[i])
		  setImage(imageArray[0])
		}
  
		let data = new FormData()
  
		console.log(idf)
	  data.append('images[]',imageArray[0])
	  
		axios.post('http://127.0.0.1:8000/api/uploads/'+idf,data).then((response)=>{
			   console.log(response)
			   handleFiche(localStorage.getItem('idatas'))
			   setLoaderImg(false)
			  })
	   }

	  	const handleFiche = (id:any)=>{
	  		setActive('all')
			axios.get('http://127.0.0.1:8000/api/fiche_suivi/'+id).then( async (response)=>{
				localStorage.setItem('idatas',id)
				setid(response.data)
				setShow3(response.data)
				setZoom(false)
				setIsOpen(true)
		})
		}

		const handleFicheN = (n:any)=>{
			setActive(n)
			axios.get('http://127.0.0.1:8000/api/fiche_suivi_n/'+localStorage.getItem('idatas')+'/'+n).then( async (response)=>{
				
				setid(response.data)
				setShow3(response.data)
				setZoom(false)
				setIsOpen(true)
		})
		}

	  const handlesave = ()=>{
	  	setLoader(true)
				axios.get('http://127.0.0.1:8000/api/cour/'+nom+'/'+titre+'/'+idniveau1+'/'+idsemestre1+'/'+enseignant+'/'+date+'/'+nc+'/'+ht).then( async (response)=>{
				console.log(response)
			setLoader(false)
			modal.current?.dismiss()
		 })
	 }

	  const fetchCours= (n:any,s:any)=>{
		axios.get('http://127.0.0.1:8000/api/cours/'+n+'/'+s).then( async (response)=>{
			console.log(response)
			setShow4(response.data)
			setCours(response.data)
		})
	  }

	  const handleFile = (e:any)=>{
		setCurrentFile(e.target.files[0])

		//setPreviewImage(URL.revokeObjectURL(e.target.files[0]))
	  }

	function confirm() {
	  modal.current?.dismiss(input.current?.value, 'confirm');
	}
  
	function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
	  if (ev.detail.role === 'confirm') {
		setMessage(`Hello, ${ev.detail.data}!`);
	  }
	}

	const fectcNiveaux = async ()=>{
		axios.get('http://127.0.0.1:8000/api/niveau/').then( async (response)=>{
		 await setNiveaux(response.data)
		  setShow(response.data)
		})
	  }

	  const fectcSemestre = async ()=>{
		axios.get('http://127.0.0.1:8000/api/semestre/').then( async (response)=>{
		 await setSemestre(response.data)
		  setShow2(response.data)
		})
	  }

	  const fectcEnseignants = async ()=>{
		axios.get('http://127.0.0.1:8000/api/enseignants/').then( async (response)=>{
		 await setEnseignants(response.data)
		  setShow5(response.data)
		})
	  }

	  const handleItem = (idfiche:any)=>{
		//localStorage.removeItem('id')
		localStorage.setItem('idfiche',idfiche)
		console.log(idfiche)
        history.push('tata')
	  }
 

if(loader == true){
    return (
      <> 
				<div className="wrapper fadeInDown">
				        <div id="formContent">
				        <img src={img2} id="icon" style={{width:400}} alt="User Icon" />
				       <p className='text-uppercase'  style={{
					       	width:400,
					       	color:"slateblue",
					       	fontSize:20, 
					       	fontFamily:"Javanese Text",
					       	position:'relative',
					       	left:-55
				       }} >Recherche Fiche ....</p>
				        </div>
				 </div>
  </> 
      )
  }else {
    return ( 
        	<>
    <IonContent className="ion-padding white section"  style={{marginTop:20,backgroundColor:'#fff'}}>
		<div className="row">
		<div style={{display:'flex',flexDirection:'row'}} >
      <button id="open-modal3" className='btn btn-outline-info mb-4' 
      	style={{
      	fontSize:20,
      	marginRight:1,
      	position:'absolute',
      	top:0,
      	right:0,
      	zIndex:1000,
      	marginTop:10,
      }} >
      	<i className="fa fa-search
 highlight-icon"></i></button>
      <button id="open-custom-dialog" className='btn btn-outline-info mb-4 text-uppercase' style={{
      	fontSize:20,
      	marginLeft:10,
      	position:'absolute',
      	top:0,
      	marginTop:14,
      	fontFamily:'Javanese Text',
      	zIndex:1000
      }} >choisir niveau</button>
		</div>
      
		<section className="container white section">

<div className="text-uppercase" >
				{ show4 == null ? (<p className='white section' style={{
					color:'#000',
					fontSize:20,
					zIndex: 20,
					width: '500px',
					height: '400px',
					backgroundColor:'#fff',
					marginTop:40,
					position:'relative',
					left:-5

				}} >Chargement...</p>) :  cours.map((item,i)=>{

								return  (
								<>
					<div className="row course-list white section" >
<div className="col-md-4 col-sm-4 col-xs-12">

<div className="shop-item-list entry">
<div className="" onClick={() =>  present({
                                                        header: 'ACTION',
                                                        buttons: [
                                                            {
                                                              text: 'DETAIL',
                                                              role: 'destructive',
                                                              handler:()=>{
                                                            axios.get('http://127.0.0.1:8000/api/fiche_suivi/'+item.id).then( async (response)=>{
                                                                                    localStorage.setItem('idatas',item.id)
                                                                                    setid(response.data)
                                                                                    setShow3(response.data)
                                                                                    setZoom(false)
                                                                                    setIsOpen(true)
                                                                        })
                                                              }
                                                            },
                                                            {
                                                              text: 'ALERT ABS COURS',
                                                              role: 'destructive',
                                                              handler:()=>{
                                                              	setNens(item.enseignant)
                                                              	setNue(item.nom)
                                                              	setNdate(item.date_j)
                                                            	setIsOpenStat(true)
                                                              }
                                                            },
                                                            {
                                                              text: 'SUPPRIMER',
                                                              role: 'destructive',
                                                              handler:()=>{
                                                                  axios.get('http://127.0.0.1:8000/api/delete/'+item.id).then((response)=>{
                                                                        console.log(response)
                                                                        fetchCours(localStorage.getItem('n'),localStorage.getItem('s'))
                                                                     })
                                                              }
                                                            },
                                                            {
                                                              text: 'FERMER',
                                                              role: 'cancel',
                                                              data: {
                                                                  action: 'cancel',
                                                              },
                                                            },
                                                        ],
                                                        onDidDismiss: ({ detail }) => setResult(detail),
                                                      })
                                                  }>
<img src="upload/xservice_02.png.pagespeed.ic.c6RThoxSWC.png"  alt=""/>
																			<div className="magnifier">
																			</div>
																			</div>
																			</div>

																			</div>
																			<div className="col-md-8 col-md-8">
																			<div className="shop-list-desc">
																			<h4><a href="course-single.html text-uppercase" style={{color:'#13005e',fontSize:25,textTransform: "uppercase"}}>{item.nom}</a></h4>
																			<div className="shopmeta">
																			<span className="pull-left" style={{color:'#0078d7',fontSize:20}} ><strong>SEMESTRE : </strong>{item.idsemestre}</span><br />
																			<span className="pull-left" style={{color:'#0078d7',fontSize:20}}><strong>NIVEAU : </strong>{item.idniveau}</span><br />
																			<span className="pull-left" style={{color:'#0078d7',fontSize:20}}><strong>ENSEIGNANT : </strong>{item.enseignant}</span>
																			<div className="rating pull-right">
																				<p style={{color:'#003f13',fontSize:20}} >{item.titre}</p>
																			</div>
																			</div>
																			<hr className=""/>
																		
																			</div>
																			</div>
																			</div>

<hr style={{border:"1px solid #003f13"}} className=""/>
</>
								)
								})}
					</div>
		</section>
		</div>

		<IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => handleClose()}>FERMER</IonButton>
              </IonButtons>
              <IonTitle>CREER UN COUR</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
		  <div style={{display:'flex',flexDirection:'row'}} >
		  <div className='form-group mr-4' style={{width:'50%'}} >
                  <input type='text'  className='form-control border-top-0 border-left-0 border-right-0 border-bottom-info' onChange={e => setNom(e.target.value)}  placeholder='nom' value={nom} />
              </div>

			<div className='form-group mr-4' style={{width:'50%'}} >
                  <input type='text'  className='form-control border-top-0 border-left-0 border-right-0 border-bottom-info' onChange={e => setTitre(e.target.value)}  placeholder='titre' value={titre} />
              </div>
			  
		  </div>

			<IonItem>
				<IonSelect onIonChange={(e)=>{setidniveau(e.detail.value)}}  aria-label="fruit" placeholder="Select niveaux">
				{ show == null ? (<p>Chargement...</p>) :  niveaux.map((item,i)=>{
							return  (
							<IonSelectOption value={item.nom}>{item.nom}</IonSelectOption>
							)
							})}
				</IonSelect>

			</IonItem>

			<IonItem style={{marginTop:10}}>
				<IonSelect  onIonChange={(e)=>{setidSemestre(e.detail.value)}}  aria-label="fruit" placeholder="Select semestre">
				{ show2 == null ? (<p>Chargement...</p>) :  semestre.map((item,i)=>{
							return  (
							<IonSelectOption value={item.nom}>{item.titre}</IonSelectOption>
							)
							})}
				</IonSelect>

			</IonItem>

			<IonItem style={{marginTop:10}}>
				<IonSelect  onIonChange={(e)=>{setEnseignant(e.detail.value)}}  aria-label="fruit" placeholder="Select enseignant">
				{ show5 == null ? (<p>Chargement...</p>) :  enseignants.map((item,i)=>{
							return  (
							<IonSelectOption value={item.nom}>{item.nom} {item.prenom}</IonSelectOption>
							)
							})}
				</IonSelect>

			</IonItem>

			<IonItem style={{marginTop:10,display:'flex',flexDirection:'row', justifyContent:'space-around' }}>
				<div style={{width:'100%'}} >
					<input type='date' onChange={(e)=>{setDate(e.target.value)}} value={date} className='form-control' placeholder='date' />
				</div>
			</IonItem>

			<IonItem style={{marginTop:10}}>
					<input type='number' onChange={(e)=>{setHt(e.target.value)}} value={ht} className='form-control' placeholder='total horaire' />

			</IonItem>

			<IonItem style={{marginTop:10}}>
					<input type='number' onChange={(e)=>{setNc(e.target.value)}} value={nc} className='form-control' placeholder='nombre chapitre' />

			</IonItem>

			<IonButton onClick={handlesave} style={{marginTop:70}} expand="full">SAVE</IonButton>
          </IonContent>
        </IonModal>

				{/*modal recherche*/}

				<IonModal ref={modal3} trigger="open-modal3" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => handleClose3()}>FERMER</IonButton>
              </IonButtons>
              <IonTitle>RECHERCHE</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
		  <div style={{display:'flex',flexDirection:'row'}} >
		  <div className='form-group mr-4' style={{width:'50%'}} >
                  <input type='text'  className='form-control border-top-0 border-left-0 border-right-0 border-bottom-info' onChange={e => setNom(e.target.value)}  placeholder='nom' value={nom} />
              </div>

			<div className='form-group mr-4' style={{width:'50%'}} >
                  <input type='text'  className='form-control border-top-0 border-left-0 border-right-0 border-bottom-info' onChange={e => setTitre(e.target.value)}  placeholder='titre' value={titre} />
              </div>
			  
		  </div>

			<IonItem>
				<IonSelect onIonChange={(e)=>{setidniveau(e.detail.value)}}  aria-label="fruit" placeholder="Select niveaux">
				{ show == null ? (<p>Chargement...</p>) :  niveaux.map((item,i)=>{
							return  (
							<IonSelectOption value={item.nom}>{item.nom}</IonSelectOption>
							)
							})}
				</IonSelect>

			</IonItem>

			<IonItem style={{marginTop:10}}>
				<IonSelect  onIonChange={(e)=>{setidSemestre(e.detail.value)}}  aria-label="fruit" placeholder="Select semestre">
				{ show2 == null ? (<p>Chargement...</p>) :  semestre.map((item,i)=>{
							return  (
							<IonSelectOption value={item.nom}>{item.titre}</IonSelectOption>
							)
							})}
				</IonSelect>

			</IonItem>

			<IonItem style={{marginTop:10}}>
				<IonSelect  onIonChange={(e)=>{setEnseignant(e.detail.value)}}  aria-label="fruit" placeholder="Select enseignant">
				{ show5 == null ? (<p>Chargement...</p>) :  enseignants.map((item,i)=>{
							return  (
							<IonSelectOption value={item.nom}>{item.nom} {item.prenom}</IonSelectOption>
							)
							})}
				</IonSelect>

			</IonItem>

			<IonItem style={{marginTop:10,display:'flex',flexDirection:'row', justifyContent:'space-around' }}>
				<div style={{width:'100%'}} >
					<input type='date' onChange={(e)=>{setDate(e.target.value)}} value={date} className='form-control' placeholder='date' />
				</div>
			</IonItem>

			<IonItem style={{marginTop:10}}>
					<input type='number' onChange={(e)=>{setHt(e.target.value)}} value={ht} className='form-control' placeholder='total horaire' />

			</IonItem>

			<IonItem style={{marginTop:10}}>
					<input type='number' onChange={(e)=>{setNc(e.target.value)}} value={nc} className='form-control' placeholder='nombre chapitre' />

			</IonItem>

			<IonButton onClick={handlesave} style={{marginTop:70}} expand="full">SAVE</IonButton>
          </IonContent>
        </IonModal>


		<IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle style={{fontSize:10}} >LISTES DES FICHES </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>FERMER</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
		  {
			zoom ? (
			<>
			<span style={{
				color:'darkgreen',
				fontSize:30,
				position:'absolute',
				top:'50%',
				left:'50%',
				zIndex:1000
			}} 
			className='ml-4' 
			onClick={()=>{setZoom(false)}} > 
			<i className="fa fa-search-minus"></i> 
			</span>
			
			<img alt="Silhouette of mountains" 
			style={{transform: 'scale(1) translate(20px)',height:'100%',width:'100%'}} 
			className="file-upload-image" src={img} />
			</>
			) : 
			(
				<IonContent className="">
				<div id="filters" className="filters-dropdown">
						<ul className="option-set list-group" data-option-key="filter" style={{
									display:"flex",
									flexDirection:"row",
									justifyContent:'space-around',
									listStyle: "none" , 
								}} >
						<li  className={active == "all" ? "active" : ""} ><span onClick={()=>{handleFiche(localStorage.getItem('idatas'))}} className="selected" data-option-value="*">All</span></li>
						<li className={active == "L1" ? "active" : ""}  ><span onClick={()=>{handleFicheN('L1')}}  data-option-value=".L1">L1</span></li>
						<li className={active == "L2" ? "active" : ""}  ><span onClick={()=>{handleFicheN('L2')}}>L2</span></li>
						<li className={active == "L3" ? "active" : ""}  ><span  onClick={()=>{handleFicheN('L3')}}>L3 </span></li>
						<li className={active == "M1" ? "active" : ""}  ><span  onClick={()=>{handleFicheN('M1')}}>M1</span></li>
						<li className={active == "M2" ? "active" : ""}  ><span onClick={()=>{handleFicheN('M2')}}>M2</span></li>
						</ul>
					</div>

		<section className="white section">

<div className="container">
				{ show3 == null ? (<p style={{
					color:'#000080',
					fontSize:30,
					zIndex: 20,
					width: '500px',
					height: '400px',
					backgroundColor:'#fff',
					marginTop:100,
					textTransform:'uppercase'

				}} >Chargement...</p>) : fiches.map((item,i)=>{
                                   return   (
                                    <>
										<div className="row course-list">
<div className="col-md-4 col-sm-4 col-xs-12">

<div className="shop-item-list entry">
<div className="" onClick={() =>
                                                      present({
                                                        header: 'ACTION',
                                                        buttons: [
                                                            {
                                                              text: 'DETAIL',
                                                              role: 'destructive',
                                                              handler:()=>{
                                                                  handleItem(item.id)
                                                              }
                                                            },
                                                            {
                                                              text: 'FERMER',
                                                              role: 'cancel',
                                                              data: {
                                                                  action: 'cancel',
                                                              },
                                                            },
                                                        ],
                                                        onDidDismiss: ({ detail }) => setResult(detail),
                                                      })
                                                  } >
       {
        shows ? (
           <img alt="" 
           style={{width:"200%",height:"200px"}}
            src={loaderImg ? imges :'http://127.0.0.1:8000/uploads/'+item.image}  />) : 
             (<img alt="" src="upload/xcourse_01.png.pagespeed.ic.XTOvCuUmZu.png" />)
      }
<div className="magnifier">
</div>
</div>
</div>

</div>
<div className="col-md-8 col-md-8">
<div className="shop-list-desc">
<h4><a  className='btn btn-success text-white btn-lg' style={{textTransform:"uppercase"}} >{item.UE}</a></h4>
<div className="shopmeta">
<span style={{color:'#0078d7',fontSize:15,fontFamily: 'Times New Roman'}} className="pull-left text-uppercase">
		<strong>SALLE : </strong> {item.salle} 
		<strong> SEANCE : </strong> {item.seance} 
		<strong> NIVEAUX : </strong> {item.niveau}
		</span>
	<br/>
<span style={{color:'#0078d7',fontSize:15,fontFamily: 'Times New Roman'}} className="pull-left">
		<strong> HEURE DEBUT : </strong> {item.heure_debut} 
		<strong> HEURE FIN : </strong> {item.heure_fin} 	<br/>
		<strong> DATE : </strong> {item.date}
		<strong> TOTAL HORAIRES  : </strong> {item.total_horaire}
		</span>
	<br/>
<div className="rating pull-right">
    <p style={{color:'#0078d7',fontSize:20,fontFamily: 'Times New Roman',textDecoration:'underline'}} >{item.titre}</p>
</div>
</div>

<label className='btn btn-primary text-uppercase btn-sm' style={{color:'#0078d7',fontSize:20,fontFamily: 'Times New Roman'}} htmlFor={'file'+item.id} >Changer images  </label>
 <input type='file' onChange={(e)=>{handechange(e,item.id)}} id={'file'+item.id} style={{display:'none'}} />
</div>
</div>
</div>
 <hr style={{border:"1px solid #113"}} className="invis clearfix"/>
 </>
                                   )
                                })
                            }
                  </div>
						</section>
			</IonContent>
			)
		  }
            
        </IonModal>


		<IonModal style={{backgroundColor:'#fff'}}  isOpen={true} ref={modal_niveau} trigger="open-custom-dialog">
          <div className="wrapper" style={{backgroundColor:'#fff',}}>
            <h1 style={{fontFamily:"Javanese Text"}} > CHOISIR UN  NIVEAUX</h1>
        
            <IonList id="open-action-sheet" lines="none" style={{backgroundColor:'#fff',width:'100%',height:''}}>
              <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon style={{width:60,height:60}} icon={personCircle}></IonIcon>
                <IonButton    onClick={() =>
          present({
            header: 'choisir semestre',
            buttons: [
              {
                text: 'SEMESTRE 1',
                role: 'destructive',
				handler:()=>{
					localStorage.setItem('n','L1')
					localStorage.setItem('s','S1')
					fetchCours('L1','S1')
				}
              },
              {
                text: 'SEMESTRE 2',
                handler:()=>{
					localStorage.setItem('n','L1')
					localStorage.setItem('s','S2')
					fetchCours('L1','S2')
				}
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        } style={{fontSize:25}}  >NIVEAU 1</IonButton>
              </IonItem>
              <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon style={{width:60,height:60}} icon={personCircle}></IonIcon>
                <IonButton onClick={() =>
          present({
            header: 'choisir semestre',
            buttons: [
              {
                text: 'SEMESTRE 1',
                role: 'destructive',
				handler:()=>{
					localStorage.setItem('n','L2')
					localStorage.setItem('s','S1')
					fetchCours('L2','S1')
				}
              },
              {
                text: 'SEMESTRE 2',
                handler:()=>{
					localStorage.setItem('n','L2')
					localStorage.setItem('s','S2')
					fetchCours('L2','S2')
				}
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        } style={{fontSize:25}} >NIVEAU 2</IonButton>
              </IonItem>
              <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon style={{width:60,height:60}} icon={personCircle}></IonIcon>
                <IonButton onClick={() =>
          present({
            header: 'choisir semestre',
            buttons: [
              {
                text: 'SEMESTRE 1',
                role: 'destructive',
				handler:()=>{
					localStorage.setItem('n','L3')
					localStorage.setItem('s','S1')
					fetchCours('L3','S1')
				}
              },
              {
                text: 'SEMESTRE 2',
                handler:()=>{
					localStorage.setItem('n','L3')
					localStorage.setItem('s','S2')
					fetchCours('L3','S2')
				}
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        } style={{fontSize:25}} >NIVEAU 3</IonButton>
              </IonItem>
			  <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon style={{width:60,height:60}} icon={personCircle}></IonIcon>
                <IonButton onClick={() =>
          present({
            header: 'choisir semestre',
            
            buttons: [
              {
                text: 'SEMESTRE 1',
                role: 'destructive',
				handler:()=>{
					localStorage.setItem('n','M1')
					localStorage.setItem('s','S1')
					fetchCours('M1','S1')
				}
              },
              {
                text: 'SEMESTRE 2',
                handler:()=>{
					localStorage.setItem('n','M1')
					localStorage.setItem('s','S2')
					fetchCours('M1','S2')
				}
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        } style={{fontSize:25}} >MASTER 1</IonButton>
              </IonItem>
			  <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon style={{width:60,height:60}} icon={personCircle}></IonIcon>
                <IonButton onClick={() =>
          present({
            header: 'Example header',
            subHeader: 'Example subheader',
            buttons: [
              {
                text: 'SEMESTRE 1',
                role: 'destructive',
				handler:()=>{
					localStorage.setItem('n','M2')
					localStorage.setItem('s','S1')
					fetchCours('M2','S1')
				}
              },
              {
                text: 'SEMESTRE 2',
                handler:()=>{
					localStorage.setItem('n','M2')
					localStorage.setItem('s','S2')
					fetchCours('M2','S2')
				}
              },
              {
                text: 'Cancel', 
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        } style={{fontSize:25}} >MASTER 2</IonButton>
              </IonItem>
            </IonList>
          </div>
        </IonModal>
	</IonContent>
	
	<IonModal isOpen={isOpen_stat}  onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => handleClose_stat()}>FERMER</IonButton>
              </IonButtons>
              <IonTitle></IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  ALERT
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
		 					<section className="white section">
									<div className="container">
									<div className="row contact-wrapper">
									<div className="col-md-9 col-sm-9 col-xs-12 content-widget">
									<div className="widget-title">
									<h4>Notification </h4>
									<hr/>
									</div>
									<div id="contact_form" className="contact_form row">
									<div id="message"></div>
									<form id="contactform" action="http://templatevisual.com/demo/learnplus/contact.php" name="contactform" method="post">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<input type="text" name="name" disabled id="name" style={{width:"100%"}} value={nens} className="form-control" placeholder="Name *"/>
									<input type="text" name="email" disabled id="email" style={{width:"100%"}} value={nue} className="form-control" placeholder="Email *"/>
									<input type="text" name="name" disabled id="website" style={{width:"100%"}} value={ndate} className="form-control" placeholder="Website"/>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<textarea className="form-control" value={ncomment} onChange={(e)=>{setNcomment(e.target.value)}} name="comments" id="comments"  placeholder="commentaire"></textarea>
									<button type="submit" onClick={(e)=>{handleAlert(e)}} value="SEND" id="submit" className="btn btn-primary btn-block">Envoyer </button>
									</div>
									</form>
									</div>
									</div>
									
									</div>
									</div>
							</section>
          </IonContent>
        </IonModal>
	
		 <IonAlert
        isOpen={isOpen1}
        header="Important message"
        message="message Envoyer avec success "
        buttons={[
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
             setIsOpenStat(false)
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
               <span className='icon'  ><i className="fa fa-home"></i></span>
               <span className='test'   >Acceuil</span>
             </a>
           </li>
           <li className='list activ' >
             <a href='tab3' >
               <span className='icon' style={{color:"white"}}><i className="fa fa-book"></i></span>
               <span className='test' >Fiches</span>
             </a>
           </li>
           <li className='list' >
             <a href='alert ' >
               <span className='icon'  ><i className="fa fa-bell"></i></span>
               <span className='test' style={{color:"white"}} >Alert</span>
             </a>
           </li>
           <li className='list' >
             <a href='fiche' >
               <span className='icon' ><i className="fa fa-file-text"></i></span>
               <span className='test' >Emmargement</span>
             </a>
           </li>
         </ul>
      </div>
    </>
	</>
 )
    
  }

};

export default Tab3;


			