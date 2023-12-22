import axios from 'axios';
import {useState} from "react";

function MyLog({rows}) {
    const t = rows.map((item, i) => <tr key={i}>{<td key={item["id"]}>{item['operationName']}</td>}</tr>)
    return <table>
        <tbody>
        {t}
        </tbody>
    </table>
}

const CxyLog = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    let t = ''

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const {data} = await axios.post(
                'https://test.chuxianyun.com/api/bms/factory/view/v2/dynamic?tableId=5&factoryId=125',
                {"params": {"tableId": "5", "factoryId": "125"}},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'token': 'a494e980c75364f2cd6aa24dd79a4cab'
                    },
                },
            );

            // console.log(JSON.stringify(data, null, 4));
            // t = data['data']['rows'].map(item => <tr>{JSON.stringify(item, null, 4)}</tr>)
            // console.log(data["data"]["columnList"].some((item)=>item.hasOwnProperty("children")))

            setData(data);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {err && <h2>{err}</h2>}

            <button onClick={handleClick}>Make request</button>

            {isLoading && <h2>Loading...</h2>}

            {data && (
                <MyLog rows={data['data']['rows']}/>
                // data["data"]["columnList"].some((item)=>item.hasOwnProperty("children"))
            )}
        </div>
    );
};
export default CxyLog;