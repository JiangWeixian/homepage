
export const getStaticProps = async () => {
  const { prisma } = await import('lib/prisma')
  const results = await prisma.article.findMany()
  console.log(results)
  return { props: { results } }
}

const ReadList = (props) => {
  console.log(props)
  return (
    <div>
      readlist
    </div>
  )
}

export default ReadList
