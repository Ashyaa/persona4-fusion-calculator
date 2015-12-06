// Write here all data for Persona 4 Golden fusion computation: list of personae,
// list of simple fusion results and list of triangle fusion results

'use strict';

var personae = [
    {'arcana': 'Fool',        'level':  1,  'name': 'Izanagi',           'special': true},
    {'arcana': 'Fool',        'level':  7,  'name': 'Yomotsu-Shikome',   },
    {'arcana': 'Fool',        'level':  13, 'name': 'Obariyon',          },
    {'arcana': 'Fool',        'level':  21, 'name': 'Legion',            },
    {'arcana': 'Fool',        'level':  31, 'name': 'Ose',               },
    {'arcana': 'Fool',        'level':  38, 'name': 'Black Frost',       'special': true},
    {'arcana': 'Fool',        'level':  46, 'name': 'Decarabia',         },
    {'arcana': 'Fool',        'level':  56, 'name': 'Shiki-Ouji',        },
    {'arcana': 'Fool',        'level':  64, 'name': 'Loki',             'max': true},
    {'arcana': 'Magician',    'level':  2,  'name': 'Pixie',            'special': true},
    {'arcana': 'Magician',    'level':  8,  'name': 'Orobas',            },
    {'arcana': 'Magician',    'level':  16, 'name': 'Jack Frost',        },
    {'arcana': 'Magician',    'level':  25, 'name': 'Hua Po',            },
    {'arcana': 'Magician',    'level':  32, 'name': 'Pyro Jack',         },
    {'arcana': 'Magician',    'level':  39, 'name': 'Dis',               },
    {'arcana': 'Magician',    'level':  47, 'name': 'Rangda',            },
    {'arcana': 'Magician',    'level':  62, 'name': 'Jinn',              },
    {'arcana': 'Magician',    'level':  69, 'name': 'Surt',              },
    {'arcana': 'Magician',    'level':  78, 'name': 'Mada',             'max': true},
    {'arcana': 'Priestess',   'level':  11, 'name': 'Saki Mitama',       },
    {'arcana': 'Priestess',   'level':  17, 'name': 'Sarasvati',         },
    {'arcana': 'Priestess',   'level':  22, 'name': 'High Pixie',        },
    {'arcana': 'Priestess',   'level':  29, 'name': 'Ganga',             },
    {'arcana': 'Priestess',   'level':  37, 'name': 'Parvati',           },
    {'arcana': 'Priestess',   'level':  48, 'name': 'Kikuri-Hime',       },
    {'arcana': 'Priestess',   'level':  59, 'name': 'Hariti',            },
    {'arcana': 'Priestess',   'level':  70, 'name': 'Tzitzimitl',        },
    {'arcana': 'Priestess',   'level':  79, 'name': 'Scathach',          'max': true},
    {'arcana': 'Empress',     'level':  9,  'name': 'Senri',             },
    {'arcana': 'Empress',     'level':  18, 'name': 'Yaksini',           },
    {'arcana': 'Empress',     'level':  26, 'name': 'Titania',           },
    {'arcana': 'Empress',     'level':  34, 'name': 'Gorgon',            },
    {'arcana': 'Empress',     'level':  44, 'name': 'Gabriel',           },
    {'arcana': 'Empress',     'level':  52, 'name': 'Skadi',             },
    {'arcana': 'Empress',     'level':  60, 'name': 'Mother Harlot',     },
    {'arcana': 'Empress',     'level':  18, 'name': 'Alilat',            },
    {'arcana': 'Empress',     'level':  18, 'name': 'Isis',              'max': true},
    {'arcana': 'Emperor',     'level':  12, 'name': 'Oberon',            },
    {'arcana': 'Emperor',     'level':  22, 'name': 'King Frost',        },
    {'arcana': 'Emperor',     'level':  34, 'name': 'Sentanta',          },
    {'arcana': 'Emperor',     'level':  41, 'name': 'Oukuninushi',       },
    {'arcana': 'Emperor',     'level':  45, 'name': 'Thoth',             },
    {'arcana': 'Emperor',     'level':  51, 'name': 'Pabilsag',          },
    {'arcana': 'Emperor',     'level':  65, 'name': 'Barong',            },
    {'arcana': 'Emperor',     'level':  74, 'name': 'Odin',              'max': true},
    {'arcana': 'Hierophant',  'level':  7,  'name': 'Omoikane',          },
    {'arcana': 'Hierophant',  'level':  15, 'name': 'Anzu',              },
    {'arcana': 'Hierophant',  'level':  21, 'name': 'Shiisaa',           },
    {'arcana': 'Hierophant',  'level':  29, 'name': 'Unicorn',           },
    {'arcana': 'Hierophant',  'level':  36, 'name': 'Flauros',           },
    {'arcana': 'Hierophant',  'level':  45, 'name': 'Hokuto Seikun',     },
    {'arcana': 'Hierophant',  'level':  52, 'name': 'Cerberus',          },
    {'arcana': 'Hierophant',  'level':  60, 'name': 'Daisoujou',         },
    {'arcana': 'Hierophant',  'level':  70, 'name': 'Hachiman',          },
    {'arcana': 'Hierophant',  'level':  76, 'name': 'Kohryu',            'max': true, 'special': true},
    {'arcana': 'Lovers',      'level':  25, 'name': 'Queen Mab',         },
    {'arcana': 'Lovers',      'level':  33, 'name': 'Undine',            },
    {'arcana': 'Lovers',      'level':  42, 'name': 'Leanan Sidhe',      },
    {'arcana': 'Lovers',      'level':  53, 'name': 'Rapahel',           },
    {'arcana': 'Lovers',      'level':  64, 'name': 'Cybele',            },
    {'arcana': 'Lovers',      'level':  71, 'name': 'Ishtar',            'max': true},
    {'arcana': 'Chariot',     'level':  2,  'name': 'Slime',             'special': true},
    {'arcana': 'Chariot',     'level':  6,  'name': 'Nata Taishi',       },
    {'arcana': 'Chariot',     'level':  12, 'name': 'Eligor',            },
    {'arcana': 'Chariot',     'level':  18, 'name': 'Ara Mitama',        },
    {'arcana': 'Chariot',     'level':  25, 'name': 'Ares',              },
    {'arcana': 'Chariot',     'level':  43, 'name': 'Triglav',           },
    {'arcana': 'Chariot',     'level':  54, 'name': 'Kin-ki',            },
    {'arcana': 'Chariot',     'level':  65, 'name': 'Thor',              },
    {'arcana': 'Chariot',     'level':  72, 'name': 'Atavaka',           },
    {'arcana': 'Chariot',     'level':  80, 'name': 'Futsunushi',        'max': true, 'special': true},
    {'arcana': 'Justice',     'level':  4,  'name': 'Angel',             },
    {'arcana': 'Justice',     'level':  11, 'name': 'Archangel',         },
    {'arcana': 'Justice',     'level':  19, 'name': 'Principality',      },
    {'arcana': 'Justice',     'level':  27, 'name': 'Power',             },
    {'arcana': 'Justice',     'level':  33, 'name': 'Virtue',            },
    {'arcana': 'Justice',     'level':  38, 'name': 'Dominion',          },
    {'arcana': 'Justice',     'level':  49, 'name': 'Throne',            },
    {'arcana': 'Justice',     'level':  58, 'name': 'Uriel',             },
    {'arcana': 'Justice',     'level':  66, 'name': 'Melchizedek',       },
    {'arcana': 'Justice',     'level':  74, 'name': 'Sraosha',           'max': true},
    {'arcana': 'Hermit',      'level':  6,  'name': 'Forneus',           },
    {'arcana': 'Hermit',      'level':  17, 'name': 'Ippon-Datara',      },
    {'arcana': 'Hermit',      'level':  26, 'name': 'Lamia',             },
    {'arcana': 'Hermit',      'level':  33, 'name': 'Mothman',           },
    {'arcana': 'Hermit',      'level':  41, 'name': 'Hitokoto-Nushi',    },
    {'arcana': 'Hermit',      'level':  48, 'name': 'Kurama Tengu',      },
    {'arcana': 'Hermit',      'level':  55, 'name': 'Niddhoggr',         },
    {'arcana': 'Hermit',      'level':  63, 'name': 'Nebiros',           },
    {'arcana': 'Hermit',      'level':  73, 'name': 'Arahabaki',         },
    {'arcana': 'Hermit',      'level':  82, 'name': 'Ongyo-ki',          'max': true, 'special': true},
    {'arcana': 'Fortune',     'level':  35, 'name': 'Fortuna',           },
    {'arcana': 'Fortune',     'level':  44, 'name': 'Clotho',            },
    {'arcana': 'Fortune',     'level':  51, 'name': 'Lachesis',          },
    {'arcana': 'Fortune',     'level':  58, 'name': 'Ananta',            },
    {'arcana': 'Fortune',     'level':  65, 'name': 'Atropos',           },
    {'arcana': 'Fortune',     'level':  72, 'name': 'Norn',              'max': true, 'special': true},
    {'arcana': 'Strength',    'level':  5,  'name': 'Sandman',           },
    {'arcana': 'Strength',    'level':  8,  'name': 'Valkyrie',          },
    {'arcana': 'Strength',    'level':  14, 'name': 'Titan',             },
    {'arcana': 'Strength',    'level':  23, 'name': 'Rakshasa',          },
    {'arcana': 'Strength',    'level':  28, 'name': 'Kusi Mitama',       },
    {'arcana': 'Strength',    'level':  30, 'name': 'Oni',               },
    {'arcana': 'Strength',    'level':  42, 'name': 'Hanuman',           },
    {'arcana': 'Strength',    'level':  50, 'name': 'Kali',              },
    {'arcana': 'Strength',    'level':  63, 'name': 'Siegfried',         },
    {'arcana': 'Strength',    'level':  90, 'name': 'Zaou-Gongen',       'max': true},
    {'arcana': 'Hanged Man',  'level':  15, 'name': 'Berith',            },
    {'arcana': 'Hanged Man',  'level':  22, 'name': 'Yomotsu-Ikusa',     },
    {'arcana': 'Hanged Man',  'level':  27, 'name': 'Makami',            },
    {'arcana': 'Hanged Man',  'level':  39, 'name': 'Orthrus',           },
    {'arcana': 'Hanged Man',  'level':  49, 'name': 'Yatsufusa',         'special': true},
    {'arcana': 'Hanged Man',  'level':  56, 'name': 'Taowu',             },
    {'arcana': 'Hanged Man',  'level':  66, 'name': 'Hell Biker',        },
    {'arcana': 'Hanged Man',  'level':  71, 'name': 'Vasuki',            },
    {'arcana': 'Hanged Man',  'level':  82, 'name': 'Attis',             'max': true},
    {'arcana': 'Death',       'level':  9,  'name': 'Ghoul',             },
    {'arcana': 'Death',       'level':  14, 'name': 'Mokoi',             },
    {'arcana': 'Death',       'level':  24, 'name': 'Matador',           },
    {'arcana': 'Death',       'level':  36, 'name': 'Samael',            },
    {'arcana': 'Death',       'level':  46, 'name': 'Mot',               },
    {'arcana': 'Death',       'level':  58, 'name': 'White Rider',       },
    {'arcana': 'Death',       'level':  72, 'name': 'Alice',             'special': true},
    {'arcana': 'Death',       'level':  78, 'name': 'Mahakala',          'max': true, 'special': true},
    {'arcana': 'Temperance',  'level':  4,  'name': 'Apsaras',           },
    {'arcana': 'Temperance',  'level':  11, 'name': 'Sylph',             },
    {'arcana': 'Temperance',  'level':  16, 'name': 'Xiezhai',           },
    {'arcana': 'Temperance',  'level':  23, 'name': 'Nigi Mitama',       },
    {'arcana': 'Temperance',  'level':  31, 'name': 'Mithra',            },
    {'arcana': 'Temperance',  'level':  40, 'name': 'Genbu',             },
    {'arcana': 'Temperance',  'level':  47, 'name': 'Seiryu',            },
    {'arcana': 'Temperance',  'level':  54, 'name': 'Suzaku',            },
    {'arcana': 'Temperance',  'level':  62, 'name': 'Byakko',            },
    {'arcana': 'Temperance',  'level':  69, 'name': 'Yurlungur',         },
    {'arcana': 'Temperance',  'level':  73, 'name': 'Vishnu',            'max': true},
    {'arcana': 'Devil',       'level':  3,  'name': 'Ukobach',           'special': true},
    {'arcana': 'Devil',       'level':  10, 'name': 'Lilim',             },
    {'arcana': 'Devil',       'level':  19, 'name': 'Vetala',            },
    {'arcana': 'Devil',       'level':  28, 'name': 'Incubus',           },
    {'arcana': 'Devil',       'level':  37, 'name': 'Pazuzu',            },
    {'arcana': 'Devil',       'level':  44, 'name': 'Sucubus',           },
    {'arcana': 'Devil',       'level':  53, 'name': 'Lilith',            },
    {'arcana': 'Devil',       'level':  61, 'name': 'Belphegor',         },
    {'arcana': 'Devil',       'level':  68, 'name': 'Belial',            },
    {'arcana': 'Devil',       'level':  81, 'name': 'Beelzebub',         'max': true, 'special': true},
    {'arcana': 'Tower',       'level':  35, 'name': 'Taotie',            },
    {'arcana': 'Tower',       'level':  46, 'name': 'Cu Chulainn',       },
    {'arcana': 'Tower',       'level':  55, 'name': 'Abaddon',           },
    {'arcana': 'Tower',       'level':  62, 'name': 'Mara',              },
    {'arcana': 'Tower',       'level':  69, 'name': 'Masakado',          },
    {'arcana': 'Tower',       'level':  75, 'name': 'Yoshitsune',        'special': true},
    {'arcana': 'Tower',       'level':  80, 'name': 'Shiva',             'max': true, 'special': true},
    {'arcana': 'Star',        'level':  24, 'name': 'Kaiwan',            },
    {'arcana': 'Star',        'level':  32, 'name': 'Neko Shogun',       'special': true},
    {'arcana': 'Star',        'level':  43, 'name': 'Fuu-ki',            },
    {'arcana': 'Star',        'level':  50, 'name': 'Ganesha',           },
    {'arcana': 'Star',        'level':  57, 'name': 'Garuda',            },
    {'arcana': 'Star',        'level':  67, 'name': 'Kartikeya',         },
    {'arcana': 'Star',        'level':  75, 'name': 'Saturnus',          },
    {'arcana': 'Star',        'level':  87, 'name': 'Helel',             'max': true},
    {'arcana': 'Moon',        'level':  20, 'name': 'Andra',             },
    {'arcana': 'Moon',        'level':  27, 'name': 'Nozuchi',           },
    {'arcana': 'Moon',        'level':  34, 'name': 'Yamata-no-Orochi',  },
    {'arcana': 'Moon',        'level':  41, 'name': 'Alraune',           },
    {'arcana': 'Moon',        'level':  48, 'name': 'Girimehkala'        },
    {'arcana': 'Moon',        'level':  57, 'name': 'Sui-ki',            },
    {'arcana': 'Moon',        'level':  68, 'name': 'Seth',              },
    {'arcana': 'Moon',        'level':  77, 'name': 'Baal Zebul',        },
    {'arcana': 'Moon',        'level':  84, 'name': 'Sandalphon',        'max': true},
    {'arcana': 'Sun',         'level':  10, 'name': 'Cu Sith',           },
    {'arcana': 'Sun',         'level':  20, 'name': 'Phoenix',           },
    {'arcana': 'Sun',         'level':  31, 'name': 'Gdon',              },
    {'arcana': 'Sun',         'level':  40, 'name': 'Yatagarasu',        },
    {'arcana': 'Sun',         'level':  47, 'name': 'Narasimha',         },
    {'arcana': 'Sun',         'level':  53, 'name': 'Tam Lin',           'special': true},
    {'arcana': 'Sun',         'level':  61, 'name': 'Jatayu',            },
    {'arcana': 'Sun',         'level':  68, 'name': 'Horus',             },
    {'arcana': 'Sun',         'level':  77, 'name': 'Suparna',           },
    {'arcana': 'Sun',         'level':  86, 'name': 'Asura',             'max': true},
    {'arcana': 'Judgement',   'level':  59, 'name': 'Anubis',            },
    {'arcana': 'Judgement',   'level':  67, 'name': 'Trumpeter',         'special': true},
    {'arcana': 'Judgement',   'level':  72, 'name': 'Michael',           },
    {'arcana': 'Judgement',   'level':  76, 'name': 'Satan',             },
    {'arcana': 'Judgement',   'level':  83, 'name': 'Metatron',          },
    {'arcana': 'Judgement',   'level':  90, 'name': 'Ardha',             'special': true},
    {'arcana': 'Judgement',   'level':  93, 'name': 'Lucifer',           'max': true, 'special': true},
    {'arcana': 'Jester',      'level':  20, 'name': 'Gurr',              },
    {'arcana': 'Jester',      'level':  27, 'name': 'Take-Minakata',     },
    {'arcana': 'Jester',      'level':  34, 'name': 'Pale Rider',        },
    {'arcana': 'Jester',      'level':  40, 'name': 'Loa',               },
    {'arcana': 'Jester',      'level':  47, 'name': 'Baphomet',          },
    {'arcana': 'Jester',      'level':  55, 'name': 'Kumbhanda',         },
    {'arcana': 'Jester',      'level':  62, 'name': 'Cherbonog',         },
    {'arcana': 'Jester',      'level':  68, 'name': 'Seiten Taisei',     },
    {'arcana': 'Jester',      'level':  77, 'name': 'Magatsu Izanagi',   'max': true},
    {'arcana': 'Aeon',        'level':  18, 'name': 'Ame-no-Uzume',      },
    {'arcana': 'Aeon',        'level':  24, 'name': 'Narcissus',         },
    {'arcana': 'Aeon',        'level':  31, 'name': 'Sati',              },
    {'arcana': 'Aeon',        'level':  37, 'name': 'Raja Naga',         },
    {'arcana': 'Aeon',        'level':  44, 'name': 'Kushinada-Hime',    },
    {'arcana': 'Aeon',        'level':  51, 'name': 'Quetzalcoatl',      },
    {'arcana': 'Aeon',        'level':  58, 'name': 'Kingu',             },
    {'arcana': 'Aeon',        'level':  65, 'name': 'Lakshmi',           },
    {'arcana': 'Aeon',        'level':  74, 'name': 'Kaguya',            'max': true},
    {'arcana': 'World',       'level':  91, 'name': 'Izanagi-no-Okami',  'max': true, 'special': true },
];

var arcana2Combos = [
    {'source': ['Fool',       'Fool',       ], 'result': 'Fool'        },
];

var arcana3Combos = [
    {'source': ['Magician',   'Fool',       ], 'result': 'Fortune'     },
];

var specialCombos = [
    {'result': 'Alice', 'sources': ['Nebiros', 'Belial']},
    {'result': 'Ardha', 'sources': ['Parvati', 'Shiva']},
    {'result': 'Beelzebub', 'sources': ['Pazuzu', 'Belphegor', 'Belial', 'Mot', 'Seth', 'Baal Zebul']},
    {'result': 'Black Frost', 'sources': ['Jack Frost', 'Pyro Jack', 'King Frost', 'Pixie', 'Ghoul']},
    {'result': 'Futsunushi', 'sources': ['Ares', 'Triglav', 'Kin-ki', 'Atavaka', 'Neko Shogun']},
    {'result': 'Izanagi', 'sources': ['Yomotsu-Shikome', 'Obariyon']},
    {'result': 'Izanagi-no-Okami', 'sources': ['Izanagi', 'Sandman', 'Nata Taishi', 'Girimehkala', 'Norn', 'Oukuninushi', 'Orthrus', 'Kartikeya', 'Mithra', 'Tzitzimitl', 'Cu Chulainn', 'Legion']},
    {'result': 'Kohryu', 'sources': ['Genbu', 'Seiryu', 'Suzaku', 'Byakko']},
    {'result': 'Lucifer', 'sources': ['Ananta', 'Anubis', 'Trumpeter', 'Michael', 'Satan', 'Metatron']},
    {'result': 'Mahakala', 'sources': ['Matador', 'White Rider', 'Mother Harlot', 'Daisoujou', 'Hell Biker', 'Trumpeter']},
    {'result': 'Neko Shogun', 'sources': ['Saki Mitama', 'Ara Mitama', 'Kusi Mitama', 'Nigi Mitama']},
    {'result': 'Norn', 'sources': ['Atropos', 'Lachesis', 'Clotho']},
    {'result': 'Ongyo-ki', 'sources': ['Oni', 'Fuu-ki', 'Kin-ki', 'Sui-ki']},
    {'result': 'Pixie', 'sources': ['Orobas', 'Jack Frost']},
    {'result': 'Shiva', 'sources': ['Rangda', 'Barong']},
    {'result': 'Slime', 'sources': ['Eligor', 'Nata Taishi']},
    {'result': 'Tam Lin', 'sources': ['Phoenix', 'Gdon', 'Yatagarasu', 'Narasimha']},
    {'result': 'Trumpeter', 'sources': ['Matador', 'White Rider', 'Daisoujou', 'Taotie', 'Pabilsag', 'Taowu']},
    {'result': 'Ukobach', 'sources': ['Lilim', 'Vetala']},
    {'result': 'Yatsufusa', 'sources': ['Makami', 'Orthrus', 'Mothman', 'Thoth', 'Narasimha']},
    {'result': 'Yoshitsune', 'sources': ['Masakado', 'Shiki-Ouji', 'Oukuninushi', 'Hachiman', 'Hitokoto-Nushi']},
];