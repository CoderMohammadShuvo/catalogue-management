import React, {useState, useEffect} from 'react';
import {Pie} from 'react-chartjs-2'; 


const Modal = ({useModal, setUseModal}) => {
    const [item, setItem] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setItem(data))
    }, [])
    
    const categories = item.reduce((acc, cur) => {
        acc[cur.category] = (acc[cur.category] || 0) + 1
        return acc;
     }, {})
     
     const jewelery = categories["jewelery"];
     const mensItem = categories["men's clothing"];
     const womenItem = categories["women's clothing"];
     const electronics = categories["electronics"];

     
     
    return (
       <>
        {useModal ?  <div>
           <Pie 
                data = {{
                labels: ['Electronics', 'Jewelery', "Men's Item", "Woment's Item"],
                datasets: [{
                label: '# of Votes',
                data: [electronics, jewelery, mensItem, womenItem],
                backgroundColor: [
                  '#ff7675',
                  '#fdcb6e',
                  '#ffeaa7',
                  '#81ecec', 
              ],
                borderWidth: 1
              }]
              }
            }
               height={400}
               width={600}
               options={{
               maintainAspectRatio: false
            }}
             />
        </div> : null}
       </>
    );
};

export default Modal;