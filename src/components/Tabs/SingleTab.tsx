import { ITabs } from "../Interfaces"
import DisplayComment from '../comments/DisplayComments'

interface SingleProps{
    singleTab: ITabs
}

const SingleTab = ({singleTab}: SingleProps) => {
    console.log(singleTab)
    return(
        <div>
            <div className="singleTab">
                <h2>{singleTab.title}</h2>
            </div>
            <div>
                <DisplayComment tabId={singleTab.id} />
            </div>
        </div>
    )
}

export default SingleTab