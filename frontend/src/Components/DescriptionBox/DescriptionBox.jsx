import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione praesentium laborum non possimus dignissimos fugit quisquam molestiae voluptates nobis officia, perspiciatis adipisci voluptatum asperiores quis laboriosam sapiente ea fuga consequuntur.</p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, praesentium modi repellendus officia magni veritatis soluta nam deleniti unde vel.
                </p>
            </div>
    </div>
  )
}

export default DescriptionBox