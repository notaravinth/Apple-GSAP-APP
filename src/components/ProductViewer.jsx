import React from 'react'
import useMacbookStore from '../store'

const { color, scale, setColor, setScale } = useMacbookStore();
const ProductViewer = () => {
  return (
    <section id = "product-viewer">
        <h2>Take a closer look</h2>
        <div className='controls'>
            <p className='info'>"Macbookpro 16" in silver in {color}</p>   
            <div className='flex-center gap-4 mt-5'>
                <div className='color-control'>
                    <div onClick={() => setColor('#adb5bd')} 
                    className={clsx('bg-neutral-300', color === '#adb5bd' && 'active')}
                    />
                    <div onClick={() => setColor('#2e2c2e')} 
                    className={clsx('bg-neutral-300', color === '#2e2c2e' && 'active')}
                    />
                </div>
                <div className='size-control'>
                    <div><p>14"</p></div>
                    <div><p>16"</p></div>
                </div>
            </div> 
        </div>  
        <p className='text-white text-4xl'>Render Canvas</p>    
    </section>
  )
}

export default ProductViewer
