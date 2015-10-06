// Write here all data for Persona 4 Golden fusion computation: list of personae,
// list of simple fusion results and list of triangle fusion results

'use strict';

var personae = [
    {'arcana': 'Fool',        'level':  1, 'name': 'Izanagi',           'special': true},
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