import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='socials'>
            <a href="https://www.instagram.com/aimed_agh/?igsh=MWQxODU4NmVjcGZoZw%3D%3D&fbclid=IwY2xjawJkrh1leHRuA2FlbQIxMAABHjeqlv4X_m9VZ6kqXfHLvrVSZA0t1azGKca_Z_XH7nA9bwyzcdNz6R0gXEa-_aem_mlpvNEah8zG5Os6COmlqSA#" target='_blank'>
                <img src='src/assets/socials/insta.png' alt='instagram'>
                </img>    
            </a>

            <a href="https://www.facebook.com/profile.php?id=61570629163949" target='_blank'>
              <img src="src/assets/socials/facebook.png" alt="facebook" />
            </a>
        </div>
        <div className='info'>
          <h2>AIMED</h2>
          <p>©{new Date().getFullYear()} Copyright. All rights reserved.</p>
        </div>
        
    </footer>
  )
}

export default Footer