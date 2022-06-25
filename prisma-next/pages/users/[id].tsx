import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { User } from '..'

function User({ data }:any) {
    return (
        <ul>
        {data.users.name}
        </ul>
    )
}


export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id;
    
    const res = await fetch('http://localhost:5000/users/'+id);
    const data = await res.json()
    console.log(data);

    return {
        props: {
            data,
        },

        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('http://localhost:5000/users/')
    const result = await res.json()


    const paths = result.users.map((user: User) => ({
        params: { id: user.id.toString() },
    }))

    return { paths, fallback: 'blocking' }
}

export default User