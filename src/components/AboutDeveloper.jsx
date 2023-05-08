export default function AboutDeveloper(){
  
return(
  <div className="about-dev p-2">
  <div style={{display:"flex", justifyContent:"center"}}>
  <img src="/assets/developer_img.jpg" alt="developer_img" className="img-fluid w-70" style={{borderRadius:"0 0 5em 5em"}}/></div>
  <p>
  Assalamua'laikum warhamatullahi wabarakatuhu. I am your brother in Islam, <strong>Babatunde Ibrahim Khalilullahi</strong> and a Nigerian Developer.
  This project is made possible by the Will of Allah [Subhanahu Wata'ala] and the purpose of developing this application is to make The Word of Allah (Al-Qur'an) accessible by everybody irrespective of your language or tribe as this application supports more than 60 translation languages, and to contribute to spreading the message of Islam as it's said in the following Hādith:
  
  <div className="card m-3">
  <div className="card-body">
  <p className="text-end" id="hadith-para">
عن عبد الله بن عمرو بن العاص رضي الله عنهما : أن النبي صلى الله عليه وسلم قال: «بلغوا عني ولو آية، وحدثوا عن بني إسرائيل ولا حرج، ومن كذب علي متعمدا فَلْيَتَبَوَّأْ مقعده من النار».  
[صحيح] - [رواه البخاري]
</p>
ʿAbdullāh ibn ʿAmr ibn al-ʿās (may Allah be pleased with him) reported that the Prophet (may Allah's peace and blessings be upon him) said: "Convey from me even one verse, and narrate from the Children of Israel, and there is no sin in that. And whoever intentionally tells a lie against me, let him assume his seat in Hellfire."  <br/>
 <samp className="badge bg-primary text-light"> Sahih/Authentic. - [Al-Bukhari]</samp>
 </div>
  </div>
</p>

<div className="alert alert-primary">
Dear User: If you encounter any inconveniences while using this application, please contact me with any of the means which I shall provide below Insha'Allah. <br/>
Dear Developer: If you have any suggestions on how this application can be improved, please push the request to this project repository on my GitHub which I shall provide Insha'Allah, you're most welcome.
</div>
<ul className="container list-group list-group-flush" id="contact-container">
<li className="list-item-heading text-center lead" style={{textDecoration:"underline"}}>Contact Me</li>
<li className="list-group-item"><a href="mailto:babatundeibrahim436@gmail.com"><i className="bi-mailbox2 text-danger"></i> Send report </a></li>
<li className="list-group-item">
<a href="tel:+2348118325902"><i className="bi-telephone-forward"></i> Send SMS message </a></li>

<li className="list-group-item">
<a href="https://api.whatsapp.com/send?phone=+2348118325902"><i className="bi-whatsapp text-success"></i> Message me on WhatsApp </a></li>
<li className="list-group-item">
 <a href="https://www.facebook.com/ibrahim.isiaq.775"><i className="bi-facebook" style={{color:"hsl(217, 91.2%, 59.8%)"}}></i> Message me on Facebook </a></li>
<li className="list-group-item">
<a href=""><i className="bi-github"></i> Pull issue/request to GitHub</a></li>
</ul>
</div>
  )

}

