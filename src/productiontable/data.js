import {useState} from "react";

function ProductRow({product}) {
    const name = product.stocked ? product.name :
        <span style={{color: 'red'}}>
      {product.name}
    </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );

}

function ProductCategoryRow({category}) {
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    )
}

function ProductTable({products, filterText, inStockOnly}) {
    /*
    // ChatGPT
    const categories = [...new Set(products.map(product => product.category))];
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filterText.toLowerCase()) &&
        (!inStockOnly || product.stocked)
    );

    const rows = categories.map(category => {
        const categoryRow = (
            <ProductCategoryRow
                category={category}
                key={category}
            />
        );
        const productRows = filteredProducts
            .filter(product => product.category === category)
            .map(product => (
                <ProductRow
                    product={product}
                    key={product.name}
                />
            ));
        return [categoryRow, ...productRows];
    });
    // */
    // /*
    // owner
    const categories = Array.from(new Set(products.map(product => product.category)))
    const rows = []
    for (let i = 0; i < categories.length; i++) {
        rows.push(
            <ProductCategoryRow
                category={categories[i]}
                key={categories[i]}/>
        )
        for (let j = 0; j < products.length; j++) {
            if (
                products[j].name.toLowerCase().indexOf(
                    filterText.toLowerCase()
                ) === -1
            ) {
                continue;
            }
            if (inStockOnly && !products[j].stocked) {
                continue;
            }
            if (categories[i] === products[j].category) {
                rows.push(
                    <ProductRow
                        product={products[j]}
                        key={products[j].name}/>
                )
            }
        }
    }
    // */
    /*
    // React
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category}/>
            );
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name}/>
        );
        lastCategory = product.category;
    });
    // */

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
    return (
        <form>
            <input
                type="text"
                value={filterText}
                placeholder="Search..."
                onChange={(e) => onFilterTextChange(e.target.value)}/>
            <label>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)}/>
                {' '}
                Only show products in stock
            </label>
        </form>
    );
}

function FilterableProductTable({products}) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    return (<div>
        <SearchBar
            filterText={filterText}
            inStockOnly={inStockOnly}
            onFilterTextChange={setFilterText}
            onInStockOnlyChange={setInStockOnly}/>
        <ProductTable
            products={products}
            filterText={filterText}
            inStockOnly={inStockOnly}/>
    </div>)
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function MyApp() {
    return (<FilterableProductTable products={PRODUCTS}/>)
}
