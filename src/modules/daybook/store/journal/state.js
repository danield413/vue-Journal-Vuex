// donde alojaremos el estado de nuestro módulo

export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam nobis molestias laboriosam laborum ad praesentium facere consectetur reiciendis odit vero!',
            picture: null
        },
        {
            id: new Date().getTime() + 1000,
            date: new Date().toDateString(),
            text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque voluptas dicta aperiam natus laudantium architecto delectus provident possimus qui laboriosam? Ducimus minima neque rem? Facilis iusto earum aliquam delectus eveniet unde quia omnis aspernatur alias, ab, minus enim? Aperiam ut soluta odit quam, tenetur ipsam?',
            picture: null
        },
        {
            id: new Date().getTime() + 2000,
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias numquam recusandae consectetur voluptate accusantium.',
            picture: null
        },
        {
            id: new Date().getTime() + 3000,
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias numquam recusandae consectetur voluptate accusantium.',
            picture: null
        },
    ]
})