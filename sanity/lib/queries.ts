import { groq } from 'next-sanity'

export const articlesQuery = groq`
  *[_type == "article"] | order(datePublication desc) {
    _id,
    titre,
    slug,
    categorie,
    extrait,
    image,
    auteur,
    datePublication
  }
`

export const articleQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    titre,
    slug,
    categorie,
    extrait,
    image,
    contenu,
    auteur,
    datePublication
  }
`
