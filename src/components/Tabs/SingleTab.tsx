import { ITabs } from "../Interfaces"

interface SingleProps{
    singleTab: ITabs
}

const SingleTab = ({singleTab}: SingleProps) => {
    console.log(singleTab)
    return(
        <div className="singleTab">
            <h2>{singleTab.title}</h2>
        </div>
    )
}

export default SingleTab