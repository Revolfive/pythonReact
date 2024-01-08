import {useState} from "react";
import axios from "axios";


function MyTable({columnList}) {
    return <>
        <table>
            <MyThead columnList={columnList}/>
            <MyTbody columnList={columnList}/>
        </table>
    </>
}

function MyThead({columnList}) {
    return < >
        < thead>
        <TrParent columnList={columnList}/>
        <TrChildren columnList={columnList}/>
        </thead>
    </>

}

function MyTbody({columnList}) {
    const rows = []
    columnList.forEach(item => {
        if (item.hasOwnProperty("children")) {
            item["children"].forEach(i => rows.push(<td key={i.id}>{i.name}</td>))
        } else {
            rows.push(<td key={item.id}>{item.name}</td>)
        }


    })
    return <>
        <tbody>
        <tr>
            {rows}
        </tr>
        <tr>
            {rows}
        </tr>
        <tr>
            {rows}
        </tr>
        <tr>
            {rows}
        </tr>
        <tr>
            {rows}
        </tr>
        </tbody>
    </>
}

function MyTr({data}) {
    return <>
        <tr className="chx-table-header">{data}</tr>
    </>
}

function TrParent({columnList}) {
    const th = columnList.map(item => {
        const rows = item.hasOwnProperty("children") ? 1 : 2
        const cols = item.hasOwnProperty("children") ? item.children.length : 1
        return <th colSpan={cols} rowSpan={rows} key={item.id}>{item.name}</th>
    })
    return <>
        <MyTr data={th}/>
    </>
}

function TrChildren({columnList}) {
    const th = columnList.map(item => {
        if (item.hasOwnProperty("children")) {
            return item["children"].map(i => <th colSpan="1" rowSpan="1" key={i.id}>{i.name}</th>)
        }
    })
    return <>
        <MyTr data={th}/>
    </>
}


const CxyLog = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const {data} = await axios.post(
                'https://test.chuxianyun.com/api/bms/factory/view/v2/dynamic?tableId=1&factoryId=125',
                {"params": {"tableId": "1", "factoryId": "125"}},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'token': 'a494e980c75364f2aa2336fcddaf4097'
                    },
                },
            );

            setData(data['data']['columnList']);
            setErr('')
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h5>表单 示例</h5>
            <div className="chx-table">
                <button onClick={handleClick}>新增</button>
                <button onClick={handleClick}>删除</button>
                <button onClick={handleClick}>复制</button>
                <button onClick={handleClick}>清空</button>
                <button onClick={handleClick}>暂存</button>
                <button onClick={handleClick}>确认</button>
                <button onClick={handleClick}>导入</button>
                <button onClick={handleClick}>填充</button>
                <button onClick={handleClick}>款式筛选</button>

                {/*{isLoading && <h2>Loading...</h2>}*/}
                {err && <h2>{err}</h2>}

                {data && (
                    <MyTable columnList={data}/>
                )}
            </div>
        </>
    );
};
export default CxyLog;