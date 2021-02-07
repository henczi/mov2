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
    key: 'type',
    name: 'Típus',
    type: 'select',
    props: {
      options: [
        { key: '0', label: 'Mind' },
        { key: '1', label: 'Film' },
        { key: '2', label: 'Sorozat' },
      ]
    }
  },
  {
    key: 'sort',
    name: 'Rendezés',
    type: 'select',
    props: {
      options: [
        { key: 'legfrissebb', label: 'Megjelenés' },
        { key: 'legnezettebb', label: 'Nézettség' },
        { key: 'legjobbra-ertekelt', label: 'Értékelés' },
        { key: 'legvelemenyezettebb', label: 'Vélemények' },
      ]
    }
  },
  {
    key: 'yearFrom',
    name: '',
    type: 'number',
    props: {
      append: '-tól',
      min: 1900,
      defaultValue: 1900,
      max: (new Date).getFullYear()
    }
  },
  {
    key: 'yearTo',
    name: '',
    type: 'number',
    props: {
      append: '-ig',
      min: 1900,
      defaultValue: (new Date).getFullYear(),
      max: (new Date).getFullYear()
    }
  },
];
