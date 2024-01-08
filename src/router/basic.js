import {Route, Routes} from "react-router-dom";
import Gallery from "../designModel/external_style_stock.tsx"
import CxyLog from "../formtable/table";
import Example from "../daydayup/recycle"
import {Link} from 'react-router-dom'
import {Button} from "antd";

const Home = () => {
    return (
        <>
            <Link to="/example">
                <Button className="e-button" type="primary">示例</Button>
            </Link>
            <Link to="/style">
                <Button className="e-button" type="primary">款型库</Button>
            </Link>
            <Link to="/table">
                <Button className="e-button" type="primary">操作表</Button>
            </Link>
        </>
    )

}

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/example' element={<Example/>}/>
                <Route path='/style' element={<Gallery/>}/>
                <Route path='/table' element={<CxyLog/>}/>
            </Routes>
        </div>
    )
}

export default Router