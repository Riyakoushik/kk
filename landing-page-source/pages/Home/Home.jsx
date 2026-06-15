import React from 'react'
import PropertyShowcase from '../../components/PropertyShowcase/PropertyShowcase'
import MarqueeHeaderContainer from '../../components/HeaderMarquee/MarqueeHeaderContainer'
import ActivitiesGuide from '../../components/ActivitiesGuide/ActivitiesGuide'

const Home = () => {
    return (
        <div>
            <MarqueeHeaderContainer />
            <PropertyShowcase />
            <ActivitiesGuide />
        </div >
    )
}

export default Home