let listMoves = {};
export const getIDMoves = function( i, j, ii, jj, type ){
  let moves = {
    '10011': 1,
    '10211': 2,
    '10213': 3,
    '10413': 4,
    '10415': 5,
    '10615': 6,
    '10617': 7,
    '11120': 8,
    '11122': 9,
    '11322': 10,
    '11324': 11,
    '11524': 12,
    '11526': 13,
    '11726': 14,
    '12031': 15,
    '12231': 16,
    '12233': 17,
    '12433': 18,
    '12435': 19,
    '12635': 20,
    '12637': 21,
    '13140': 22,
    '13142': 23,
    '13342': 24,
    '13344': 25,
    '13544': 26,
    '13546': 27,
    '13746': 28,
    '14051': 29,
    '14251': 30,
    '14253': 31,
    '14453': 32,
    '14455': 33,
    '14655': 34,
    '14657': 35,
    '15160': 36,
    '15162': 37,
    '15362': 38,
    '15364': 39,
    '15564': 40,
    '15566': 41,
    '15766': 42,
    '16071': 43,
    '16271': 44,
    '16273': 45,
    '16473': 46,
    '16475': 47,
    '16675': 48,
    '16677': 49,
    '21100': 50,
    '21102': 51,
    '21302': 52,
    '21304': 53,
    '21504': 54,
    '21506': 55,
    '21706': 56,
    '22011': 57,
    '22211': 58,
    '22213': 59,
    '22413': 60,
    '22415': 61,
    '22615': 62,
    '22617': 63,
    '23120': 64,
    '23122': 65,
    '23322': 66,
    '23324': 67,
    '23524': 68,
    '23526': 69,
    '23726': 70,
    '24031': 71,
    '24231': 72,
    '24233': 73,
    '24433': 74,
    '24435': 75,
    '24635': 76,
    '24637': 77,
    '25140': 78,
    '25142': 79,
    '25342': 80,
    '25344': 81,
    '25544': 82,
    '25546': 83,
    '25746': 84,
    '26051': 85,
    '26251': 86,
    '26253': 87,
    '26453': 88,
    '26455': 89,
    '26655': 90,
    '26657': 91,
    '27160': 92,
    '27162': 93,
    '27362': 94,
    '27364': 95,
    '27564': 96,
    '27566': 97,
    '27766': 98,
    '30011': 99,
    '30211': 100,
    '30213': 101,
    '30413': 102,
    '30415': 103,
    '30615': 104,
    '30617': 105,
    '31100': 106,
    '31102': 107,
    '31120': 108,
    '31122': 109,
    '31302': 110,
    '31304': 111,
    '31322': 112,
    '31324': 113,
    '31504': 114,
    '31506': 115,
    '31524': 116,
    '31526': 117,
    '31706': 118,
    '31726': 119,
    '32011': 120,
    '32031': 121,
    '32211': 122,
    '32213': 123,
    '32231': 124,
    '32233': 125,
    '32413': 126,
    '32415': 127,
    '32433': 128,
    '32435': 129,
    '32615': 130,
    '32617': 131,
    '32635': 132,
    '32637': 133,
    '33120': 134,
    '33122': 135,
    '33140': 136,
    '33142': 137,
    '33322': 138,
    '33324': 139,
    '33342': 140,
    '33344': 141,
    '33524': 142,
    '33526': 143,
    '33544': 144,
    '33546': 145,
    '33726': 146,
    '33746': 147,
    '34031': 148,
    '34051': 149,
    '34231': 150,
    '34233': 151,
    '34251': 152,
    '34253': 153,
    '34433': 154,
    '34435': 155,
    '34453': 156,
    '34455': 157,
    '34635': 158,
    '34637': 159,
    '34655': 160,
    '34657': 161,
    '35140': 162,
    '35142': 163,
    '35160': 164,
    '35162': 165,
    '35342': 166,
    '35344': 167,
    '35362': 168,
    '35364': 169,
    '35544': 170,
    '35546': 171,
    '35564': 172,
    '35566': 173,
    '35746': 174,
    '35766': 175,
    '36051': 176,
    '36071': 177,
    '36251': 178,
    '36253': 179,
    '36271': 180,
    '36273': 181,
    '36453': 182,
    '36455': 183,
    '36473': 184,
    '36475': 185,
    '36655': 186,
    '36657': 187,
    '36675': 188,
    '36677': 189,
    '37160': 190,
    '37162': 191,
    '37362': 192,
    '37364': 193,
    '37564': 194,
    '37566': 195,
    '37766': 196,
    '40011': 197,
    '40211': 198,
    '40213': 199,
    '40413': 200,
    '40415': 201,
    '40615': 202,
    '40617': 203,
    '41100': 204,
    '41102': 205,
    '41120': 206,
    '41122': 207,
    '41302': 208,
    '41304': 209,
    '41322': 210,
    '41324': 211,
    '41504': 212,
    '41506': 213,
    '41524': 214,
    '41526': 215,
    '41706': 216,
    '41726': 217,
    '42011': 218,
    '42031': 219,
    '42211': 220,
    '42213': 221,
    '42231': 222,
    '42233': 223,
    '42413': 224,
    '42415': 225,
    '42433': 226,
    '42435': 227,
    '42615': 228,
    '42617': 229,
    '42635': 230,
    '42637': 231,
    '43120': 232,
    '43122': 233,
    '43140': 234,
    '43142': 235,
    '43322': 236,
    '43324': 237,
    '43342': 238,
    '43344': 239,
    '43524': 240,
    '43526': 241,
    '43544': 242,
    '43546': 243,
    '43726': 244,
    '43746': 245,
    '44031': 246,
    '44051': 247,
    '44231': 248,
    '44233': 249,
    '44251': 250,
    '44253': 251,
    '44433': 252,
    '44435': 253,
    '44453': 254,
    '44455': 255,
    '44635': 256,
    '44637': 257,
    '44655': 258,
    '44657': 259,
    '45140': 260,
    '45142': 261,
    '45160': 262,
    '45162': 263,
    '45342': 264,
    '45344': 265,
    '45362': 266,
    '45364': 267,
    '45544': 268,
    '45546': 269,
    '45564': 270,
    '45566': 271,
    '45746': 272,
    '45766': 273,
    '46051': 274,
    '46071': 275,
    '46251': 276,
    '46253': 277,
    '46271': 278,
    '46273': 279,
    '46453': 280,
    '46455': 281,
    '46473': 282,
    '46475': 283,
    '46655': 284,
    '46657': 285,
    '46675': 286,
    '46677': 287,
    '47160': 288,
    '47162': 289,
    '47362': 290,
    '47364': 291,
    '47564': 292,
    '47566': 293,
    '47766': 294,
    '10022': 295,
    '10040': 296,
    '10044': 297,
    '10220': 298,
    '10224': 299,
    '10242': 300,
    '10246': 301,
    '10422': 302,
    '10426': 303,
    '10440': 304,
    '10444': 305,
    '10624': 306,
    '10642': 307,
    '10646': 308,
    '11133': 309,
    '11151': 310,
    '11155': 311,
    '11331': 312,
    '11335': 313,
    '11353': 314,
    '11357': 315,
    '11533': 316,
    '11537': 317,
    '11551': 318,
    '11555': 319,
    '11735': 320,
    '11753': 321,
    '11757': 322,
    '12042': 323,
    '12060': 324,
    '12064': 325,
    '12240': 326,
    '12244': 327,
    '12262': 328,
    '12266': 329,
    '12442': 330,
    '12446': 331,
    '12460': 332,
    '12464': 333,
    '12644': 334,
    '12662': 335,
    '12666': 336,
    '13153': 337,
    '13171': 338,
    '13175': 339,
    '13351': 340,
    '13355': 341,
    '13373': 342,
    '13377': 343,
    '13553': 344,
    '13557': 345,
    '13571': 346,
    '13575': 347,
    '13755': 348,
    '13773': 349,
    '13777': 350,
    '14062': 351,
    '14260': 352,
    '14264': 353,
    '14462': 354,
    '14466': 355,
    '14664': 356,
    '15173': 357,
    '15371': 358,
    '15375': 359,
    '15573': 360,
    '15577': 361,
    '15775': 362,
    '22002': 363,
    '22200': 364,
    '22204': 365,
    '22402': 366,
    '22406': 367,
    '22604': 368,
    '23113': 369,
    '23311': 370,
    '23315': 371,
    '23513': 372,
    '23517': 373,
    '23715': 374,
    '24000': 375,
    '24004': 376,
    '24022': 377,
    '24202': 378,
    '24206': 379,
    '24220': 380,
    '24224': 381,
    '24400': 382,
    '24404': 383,
    '24422': 384,
    '24426': 385,
    '24602': 386,
    '24606': 387,
    '24624': 388,
    '25111': 389,
    '25115': 390,
    '25133': 391,
    '25313': 392,
    '25317': 393,
    '25331': 394,
    '25335': 395,
    '25511': 396,
    '25515': 397,
    '25533': 398,
    '25537': 399,
    '25713': 400,
    '25717': 401,
    '25735': 402,
    '26020': 403,
    '26024': 404,
    '26042': 405,
    '26222': 406,
    '26226': 407,
    '26240': 408,
    '26244': 409,
    '26420': 410,
    '26424': 411,
    '26442': 412,
    '26446': 413,
    '26622': 414,
    '26626': 415,
    '26644': 416,
    '27131': 417,
    '27135': 418,
    '27153': 419,
    '27333': 420,
    '27337': 421,
    '27351': 422,
    '27355': 423,
    '27531': 424,
    '27535': 425,
    '27553': 426,
    '27557': 427,
    '27733': 428,
    '27737': 429,
    '27755': 430,
    '30004': 431,
    '30022': 432,
    '30040': 433,
    '30044': 434,
    '30206': 435,
    '30220': 436,
    '30224': 437,
    '30242': 438,
    '30246': 439,
    '30400': 440,
    '30422': 441,
    '30426': 442,
    '30440': 443,
    '30444': 444,
    '30602': 445,
    '30624': 446,
    '30642': 447,
    '30646': 448,
    '31115': 449,
    '31133': 450,
    '31151': 451,
    '31155': 452,
    '31317': 453,
    '31331': 454,
    '31335': 455,
    '31353': 456,
    '31357': 457,
    '31511': 458,
    '31533': 459,
    '31537': 460,
    '31551': 461,
    '31555': 462,
    '31713': 463,
    '31735': 464,
    '31753': 465,
    '31757': 466,
    '32002': 467,
    '32024': 468,
    '32042': 469,
    '32060': 470,
    '32064': 471,
    '32200': 472,
    '32204': 473,
    '32226': 474,
    '32240': 475,
    '32244': 476,
    '32262': 477,
    '32266': 478,
    '32402': 479,
    '32406': 480,
    '32420': 481,
    '32442': 482,
    '32446': 483,
    '32460': 484,
    '32464': 485,
    '32604': 486,
    '32622': 487,
    '32644': 488,
    '32662': 489,
    '32666': 490,
    '33113': 491,
    '33135': 492,
    '33153': 493,
    '33171': 494,
    '33175': 495,
    '33311': 496,
    '33315': 497,
    '33337': 498,
    '33351': 499,
    '33355': 500,
    '33373': 501,
    '33377': 502,
    '33513': 503,
    '33517': 504,
    '33531': 505,
    '33553': 506,
    '33557': 507,
    '33571': 508,
    '33575': 509,
    '33715': 510,
    '33733': 511,
    '33755': 512,
    '33773': 513,
    '33777': 514,
    '34000': 515,
    '34004': 516,
    '34022': 517,
    '34044': 518,
    '34062': 519,
    '34202': 520,
    '34206': 521,
    '34220': 522,
    '34224': 523,
    '34246': 524,
    '34260': 525,
    '34264': 526,
    '34400': 527,
    '34404': 528,
    '34422': 529,
    '34426': 530,
    '34440': 531,
    '34462': 532,
    '34466': 533,
    '34602': 534,
    '34606': 535,
    '34624': 536,
    '34642': 537,
    '34664': 538,
    '35111': 539,
    '35115': 540,
    '35133': 541,
    '35155': 542,
    '35173': 543,
    '35313': 544,
    '35317': 545,
    '35331': 546,
    '35335': 547,
    '35357': 548,
    '35371': 549,
    '35375': 550,
    '35511': 551,
    '35515': 552,
    '35533': 553,
    '35537': 554,
    '35551': 555,
    '35573': 556,
    '35577': 557,
    '35713': 558,
    '35717': 559,
    '35735': 560,
    '35753': 561,
    '35775': 562,
    '36020': 563,
    '36024': 564,
    '36042': 565,
    '36064': 566,
    '36222': 567,
    '36226': 568,
    '36240': 569,
    '36244': 570,
    '36266': 571,
    '36420': 572,
    '36424': 573,
    '36442': 574,
    '36446': 575,
    '36460': 576,
    '36622': 577,
    '36626': 578,
    '36644': 579,
    '36662': 580,
    '37131': 581,
    '37135': 582,
    '37153': 583,
    '37175': 584,
    '37333': 585,
    '37337': 586,
    '37351': 587,
    '37355': 588,
    '37377': 589,
    '37531': 590,
    '37535': 591,
    '37553': 592,
    '37557': 593,
    '37571': 594,
    '37733': 595,
    '37737': 596,
    '37755': 597,
    '37773': 598,
    '40004': 599,
    '40022': 600,
    '40040': 601,
    '40044': 602,
    '40206': 603,
    '40220': 604,
    '40224': 605,
    '40242': 606,
    '40246': 607,
    '40400': 608,
    '40422': 609,
    '40426': 610,
    '40440': 611,
    '40444': 612,
    '40602': 613,
    '40624': 614,
    '40642': 615,
    '40646': 616,
    '41115': 617,
    '41133': 618,
    '41151': 619,
    '41155': 620,
    '41317': 621,
    '41331': 622,
    '41335': 623,
    '41353': 624,
    '41357': 625,
    '41511': 626,
    '41533': 627,
    '41537': 628,
    '41551': 629,
    '41555': 630,
    '41713': 631,
    '41735': 632,
    '41753': 633,
    '41757': 634,
    '42002': 635,
    '42024': 636,
    '42042': 637,
    '42060': 638,
    '42064': 639,
    '42200': 640,
    '42204': 641,
    '42226': 642,
    '42240': 643,
    '42244': 644,
    '42262': 645,
    '42266': 646,
    '42402': 647,
    '42406': 648,
    '42420': 649,
    '42442': 650,
    '42446': 651,
    '42460': 652,
    '42464': 653,
    '42604': 654,
    '42622': 655,
    '42644': 656,
    '42662': 657,
    '42666': 658,
    '43113': 659,
    '43135': 660,
    '43153': 661,
    '43171': 662,
    '43175': 663,
    '43311': 664,
    '43315': 665,
    '43337': 666,
    '43351': 667,
    '43355': 668,
    '43373': 669,
    '43377': 670,
    '43513': 671,
    '43517': 672,
    '43531': 673,
    '43553': 674,
    '43557': 675,
    '43571': 676,
    '43575': 677,
    '43715': 678,
    '43733': 679,
    '43755': 680,
    '43773': 681,
    '43777': 682,
    '44000': 683,
    '44004': 684,
    '44022': 685,
    '44044': 686,
    '44062': 687,
    '44202': 688,
    '44206': 689,
    '44220': 690,
    '44224': 691,
    '44246': 692,
    '44260': 693,
    '44264': 694,
    '44400': 695,
    '44404': 696,
    '44422': 697,
    '44426': 698,
    '44440': 699,
    '44462': 700,
    '44466': 701,
    '44602': 702,
    '44606': 703,
    '44624': 704,
    '44642': 705,
    '44664': 706,
    '45111': 707,
    '45115': 708,
    '45133': 709,
    '45155': 710,
    '45173': 711,
    '45313': 712,
    '45317': 713,
    '45331': 714,
    '45335': 715,
    '45357': 716,
    '45371': 717,
    '45375': 718,
    '45511': 719,
    '45515': 720,
    '45533': 721,
    '45537': 722,
    '45551': 723,
    '45573': 724,
    '45577': 725,
    '45713': 726,
    '45717': 727,
    '45735': 728,
    '45753': 729,
    '45775': 730,
    '46020': 731,
    '46024': 732,
    '46042': 733,
    '46064': 734,
    '46222': 735,
    '46226': 736,
    '46240': 737,
    '46244': 738,
    '46266': 739,
    '46420': 740,
    '46424': 741,
    '46442': 742,
    '46446': 743,
    '46460': 744,
    '46622': 745,
    '46626': 746,
    '46644': 747,
    '46662': 748,
    '47131': 749,
    '47135': 750,
    '47153': 751,
    '47175': 752,
    '47333': 753,
    '47337': 754,
    '47351': 755,
    '47355': 756,
    '47377': 757,
    '47531': 758,
    '47535': 759,
    '47553': 760,
    '47557': 761,
    '47571': 762,
    '47733': 763,
    '47737': 764,
    '47755': 765,
    '47773': 766
  };
  let id = type.toString() + i.toString() + j.toString() + ii.toString() + jj.toString();
  if ( !moves[ id ] ) listMoves[id] = 1;
  return moves[ id ] || id;
}

export const getListMoves = function() {
  return listMoves;
}