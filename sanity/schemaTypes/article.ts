import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titre' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: ['Actualités','Transferts','Avant-match','Analyses','Champions League'],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'extrait',
      title: 'Extrait',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contenu',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'auteur',
      title: 'Auteur',
      type: 'string',
    }),
    defineField({
      name: 'datePublication',
      title: 'Date de publication',
      type: 'datetime',
    }),
  ],
})
