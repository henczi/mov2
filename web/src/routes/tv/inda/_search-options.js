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
  }
];
