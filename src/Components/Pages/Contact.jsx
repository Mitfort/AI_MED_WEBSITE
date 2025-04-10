import React from 'react'

const Contact = () => {
  return (
    <section id='contact'>
      <div className="badge">🔸 Kontakt </div>
      <h2>Tak się z nami porozumiesz 💬 <span></span></h2>
      <p style={{width:'50%'}}>
        <p>EMAIL: <a href="mailto:example@example.com" >aimed@agh.edu.pl</a></p>
        <p>FACEBOOK: <a href='https://www.facebook.com/profile.php?id=61570629163949' target='_blank'>Napisz wiadomość</a></p>
      </p>
    </section>
  )
}

export default Contact