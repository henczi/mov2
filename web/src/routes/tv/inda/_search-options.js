export let searchOptions = [
  {
    key: 'age',
    name: 'Feltöltve',
    type: 'select',
    props: {
      options: [
        { key: 'all', label: 'Bármikor' },
        { key: 'today', label: 'Ma' },
        { key: 'yesterday', label: 'Tegnap' },
        { key: 'week', label: 'A héten' },
        { key: 'month', label: 'A hónapban' },
        { key: 'year', label: 'Idén' },
      ]
    }
  },
  {
    key: 'adult',
    name: 'Felnőtt tartalom',
    type: 'select',
    props: {
      options: [
        { key: '', label: 'Nem' },
        { key: '1', label: 'Igen' },
      ]
    }
  },
  {
    key: 'sort',
    name: 'Rendezés',
    type: 'select',
    props: {
      options: [
        { key: 'magic', label: 'Relevancia' },
        { key: 'abc', label: 'Név' },
        { key: 'recent', label: 'Feltöltés ideje' },
        { key: 'views', label: 'Nézettség' },
        { key: 'rated', label: 'Értékelés' },
        { key: 'commented', label: 'Hozzászólás' },
      ]
    }
  },
  {
    key: 'category',
    name: 'Rendezés',
    type: 'select',
    props: {
      options: [
        { key: 'all', label: 'Mind' },
        { key: 'ad', label: 'Ad' },
        { key: 'loopr', label: 'loopR' },
        { key: 'www', label: 'Főcsatorna' },
        { key: 'index', label: 'Index' },
        { key: 'auto', label: 'Autó' },
        { key: 'erotika', label: 'Erotika' },
        { key: 'film', label: 'Film' },
        { key: 'csimota', label: 'Csimota' },
        { key: 'videotanar', label: 'Videotanár' },
        { key: 'live', label: 'Live' },
        { key: 'travelo', label: 'Travelo' },
        { key: 'palyazat', label: 'Pályázat' },
        { key: 'ams', label: 'ams' },
        { key: 'axnplayer', label: 'AXNPlayer' },
      ]
    }
  },
  {
    key: 'highlight',
    name: 'Kiemelt videók közt?',
    type: 'select',
    props: {
      options: [
        { key: '', label: 'Nem' },
        { key: '1', label: 'Igen' },
      ]
    }
  },
];
