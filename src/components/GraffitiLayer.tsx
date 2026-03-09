export default function GraffitiLayer() {
  return (
    <svg
      id="graffiti-overlay"
      viewBox="0 0 780 900"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'visible',
      }}
      aria-hidden="true"
    >
      <defs>
        <filter id="glow-white" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-red" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-green" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* PEITO — "BYTE" pixação paulistana — região x=310-470, y=280-410 */}
      <g
        data-graffiti="chest"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        filter="url(#glow-white)"
      >
        {/* Linha de crew/frame superior */}
        <path d="M 308,288 L 472,288" />
        {/* Ornamento canto sup esq */}
        <path d="M 308,288 L 303,293 L 303,300" />
        {/* Ornamento canto sup dir */}
        <path d="M 472,288 L 477,293 L 477,300" />

        {/* B — coluna esquerda + dois lobos angulosos */}
        <path d="M 314,296 L 314,398" />
        <path d="M 314,296 L 332,296 L 340,302 L 342,310 L 340,319 L 332,325 L 314,325" />
        <path d="M 314,325 L 334,325 L 343,332 L 345,342 L 343,352 L 334,358 L 314,358" />
        <path d="M 314,358 L 314,398" />
        {/* Serifa base do B */}
        <path d="M 310,398 L 346,398" />
        {/* Detalhe diagonal do lobo superior */}
        <path d="M 335,308 L 340,313" />

        {/* Y — duas diagonais + stem central */}
        <path d="M 353,296 L 368,332" />
        <path d="M 383,296 L 368,332" />
        <path d="M 368,332 L 368,398" />
        {/* Serifas do Y */}
        <path d="M 349,296 L 357,296" />
        <path d="M 379,296 L 387,296" />
        <path d="M 364,398 L 372,398" />
        {/* Ornamento angular no Y */}
        <path d="M 353,296 L 349,291" />
        <path d="M 383,296 L 387,291" />

        {/* T — crossbar + stem */}
        <path d="M 378,296 L 414,296" />
        <path d="M 396,296 L 396,398" />
        {/* Detalhe extra no crossbar do T */}
        <path d="M 378,300 L 385,300" />
        <path d="M 407,300 L 414,300" />
        {/* Serifa do T base */}
        <path d="M 392,398 L 400,398" />

        {/* E — coluna + três barras escalonadas */}
        <path d="M 420,296 L 420,398" />
        <path d="M 420,296 L 448,296" />
        <path d="M 420,344 L 440,344 L 440,350 L 420,350" />
        <path d="M 420,398 L 448,398" />
        {/* Diagonal ornamental no E */}
        <path d="M 448,296 L 452,300" />
        <path d="M 448,398 L 452,394" />
        {/* Serifa extra no E */}
        <path d="M 420,296 L 416,292" />

        {/* Linha de crew/frame inferior */}
        <path d="M 308,406 L 472,406" />
        {/* Ornamento canto inf esq */}
        <path d="M 308,406 L 303,401 L 303,394" />
        {/* Ornamento canto inf dir */}
        <path d="M 472,406 L 477,401 L 477,394" />

        {/* Traço central de crew entre B e Y */}
        <path d="M 346,344 L 352,344" />
        {/* Traço central de crew entre T e E */}
        <path d="M 413,344 L 419,344" />
      </g>

      {/* BRAÇO ESQUERDO — chaves "{ }" + tag crew — x=195-265, y=295-450 */}
      <g
        data-graffiti="arm-left"
        fill="none"
        stroke="#ff2d55"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        filter="url(#glow-red)"
      >
        {/* Frame topo */}
        <path d="M 200,306 L 262,306" />
        {/* Canto sup esq diagonal */}
        <path d="M 200,306 L 195,311" />
        {/* Canto sup dir diagonal */}
        <path d="M 262,306 L 267,311" />

        {/* Chave abre { — angulosa */}
        <path d="M 228,315 L 222,315 L 216,321 L 216,342 L 210,350 L 216,358 L 216,382 L 222,388 L 228,388" />
        {/* Extensão esquerda no centro */}
        <path d="M 210,350 L 204,350" />
        {/* Ornamento pico esq sup */}
        <path d="M 222,315 L 218,310" />
        {/* Ornamento pico esq inf */}
        <path d="M 222,388 L 218,393" />

        {/* Chave fecha } — angulosa */}
        <path d="M 234,315 L 240,315 L 246,321 L 246,342 L 252,350 L 246,358 L 246,382 L 240,388 L 234,388" />
        {/* Extensão direita no centro */}
        <path d="M 252,350 L 258,350" />
        {/* Ornamento pico dir sup */}
        <path d="M 240,315 L 244,310" />
        {/* Ornamento pico dir inf */}
        <path d="M 240,388 L 244,393" />

        {/* Diamante/losango central entre as chaves */}
        <path d="M 231,346 L 227,350 L 231,354 L 235,350 Z" />

        {/* Linha de crew vertical esq */}
        <path d="M 200,306 L 200,440" />
        {/* Linha de crew vertical dir */}
        <path d="M 262,306 L 262,440" />
        {/* Frame base */}
        <path d="M 200,440 L 262,440" />
        {/* Canto inf esq */}
        <path d="M 200,440 L 195,435" />
        {/* Canto inf dir */}
        <path d="M 262,440 L 267,435" />

        {/* Tags extras dentro do frame */}
        <path d="M 207,400 L 255,400" />
        <path d="M 207,410 L 225,410" />
        <path d="M 237,410 L 255,410" />
        {/* Pequeno X no centro baixo */}
        <path d="M 225,420 L 237,430" />
        <path d="M 237,420 L 225,430" />
      </g>

      {/* BRAÇO DIREITO — "DEV" em pixação — x=515-585, y=295-450 */}
      <g
        data-graffiti="arm-right"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        filter="url(#glow-white)"
      >
        {/* Frame topo */}
        <path d="M 513,302 L 589,302" />
        {/* Canto sup esq */}
        <path d="M 513,302 L 508,307" />
        {/* Canto sup dir */}
        <path d="M 589,302 L 594,307" />

        {/* D — coluna vertical + arco angular fechado */}
        <path d="M 518,311 L 518,415" />
        <path d="M 518,311 L 531,311 L 540,318 L 543,330 L 543,396 L 540,408 L 531,415 L 518,415" />
        {/* Costela interna do D */}
        <path d="M 518,333 L 537,333" />
        <path d="M 518,390 L 537,390" />
        {/* Detalhe angular D */}
        <path d="M 531,311 L 535,315" />
        <path d="M 531,415 L 535,411" />

        {/* E — coluna + três barras */}
        <path d="M 550,311 L 550,415" />
        <path d="M 550,311 L 572,311" />
        <path d="M 550,360 L 567,360 L 567,366 L 550,366" />
        <path d="M 550,415 L 572,415" />
        {/* Ornamentos angulares do E */}
        <path d="M 572,311 L 577,315" />
        <path d="M 572,415 L 577,411" />
        {/* Serifa esq no E */}
        <path d="M 550,311 L 545,307" />
        <path d="M 550,415 L 545,419" />

        {/* V — duas diagonais convergentes */}
        <path d="M 579,311 L 588,415" />
        <path d="M 602,311 L 588,415" />
        {/* Serifa topo V */}
        <path d="M 575,311 L 583,311" />
        <path d="M 598,311 L 606,311" />
        {/* Serifa base V */}
        <path d="M 584,415 L 592,415" />

        {/* Frame base */}
        <path d="M 513,423 L 589,423" />
        {/* Canto inf esq */}
        <path d="M 513,423 L 508,418" />
        {/* Canto inf dir */}
        <path d="M 589,423 L 594,418" />

        {/* Traço separador D-E */}
        <path d="M 545,360 L 549,360" />
        {/* Traço separador E-V */}
        <path d="M 574,360 L 578,360" />
      </g>

      {/* PERNA ESQUERDA — coroa estilizada — x=300-370, y=510-660 */}
      <g
        data-graffiti="leg-left"
        fill="none"
        stroke="#00ff88"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        filter="url(#glow-green)"
      >
        {/* Linha de base inferior da coroa */}
        <path d="M 294,640 L 370,640" />
        {/* Base da coroa — retângulo com aberturas */}
        <path d="M 294,640 L 294,625 L 302,618" />
        <path d="M 370,640 L 370,625 L 362,618" />
        {/* Parede interna esq */}
        <path d="M 314,625 L 314,618" />
        {/* Parede interna dir */}
        <path d="M 350,625 L 350,618" />
        {/* Barras de base */}
        <path d="M 294,625 L 370,625" />

        {/* Pico esquerdo da coroa */}
        <path d="M 302,618 L 302,598 L 310,582" />
        {/* Pico central esquerdo */}
        <path d="M 310,582 L 320,566 L 330,578 L 330,594" />
        {/* Pico central */}
        <path d="M 320,566 L 332,550 L 344,566" />
        {/* Pico central direito */}
        <path d="M 344,566 L 352,578 L 352,598" />
        {/* Pico direito da coroa */}
        <path d="M 352,598 L 362,618 L 362,640" />

        {/* Losango ornamental central */}
        <path d="M 326,610 L 332,603 L 338,610 L 332,617 Z" />
        {/* Ponto no meio do losango */}
        <path d="M 330,610 L 334,610" />

        {/* Linha ornamental base */}
        <path d="M 290,647 L 374,647" />
        {/* Pingentes da base */}
        <path d="M 306,640 L 303,648 L 306,656" />
        <path d="M 332,640 L 332,656" />
        <path d="M 358,640 L 361,648 L 358,656" />
        {/* Linha base pingentes */}
        <path d="M 303,656 L 361,656" />

        {/* Ornamentos topo dos picos */}
        <path d="M 310,582 L 306,578" />
        <path d="M 332,550 L 332,544" />
        <path d="M 352,578 L 356,574" />
        {/* Traço diagonal ornamental esq */}
        <path d="M 294,640 L 288,646" />
        {/* Traço diagonal ornamental dir */}
        <path d="M 370,640 L 376,646" />
      </g>

      {/* PERNA DIREITA — seta + "404" — x=410-480, y=510-660 */}
      <g
        data-graffiti="leg-right"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        filter="url(#glow-white)"
      >
        {/* Frame topo */}
        <path d="M 406,514 L 484,514" />
        {/* Canto topo esq */}
        <path d="M 406,514 L 401,519" />
        {/* Canto topo dir */}
        <path d="M 484,514 L 489,519" />

        {/* Seta para cima — estilizada angulosa */}
        <path d="M 445,524 L 445,556" />
        <path d="M 430,542 L 445,524 L 460,542" />
        {/* Serifa base da seta */}
        <path d="M 440,556 L 450,556" />
        {/* Detalhe asa da seta */}
        <path d="M 430,542 L 425,542" />
        <path d="M 460,542 L 465,542" />

        {/* Linha divisória entre seta e números */}
        <path d="M 406,564 L 484,564" />

        {/* 4 esquerdo */}
        <path d="M 413,572 L 413,596 L 425,596" />
        <path d="M 413,572 L 421,572" />
        <path d="M 422,572 L 422,620" />
        {/* Serifa topo do 4 */}
        <path d="M 409,572 L 421,572" />
        {/* Serifa base do 4 */}
        <path d="M 418,620 L 426,620" />

        {/* 0 central */}
        <path d="M 430,572 L 430,620 L 450,620 L 450,572 Z" />
        {/* Diagonal interna do 0 */}
        <path d="M 434,578 L 446,614" />
        {/* Detalhe interior */}
        <path d="M 434,580 L 446,580" />

        {/* 4 direito */}
        <path d="M 458,572 L 458,596 L 470,596" />
        <path d="M 458,572 L 466,572" />
        <path d="M 467,572 L 467,620" />
        {/* Serifa topo do 4 */}
        <path d="M 454,572 L 466,572" />
        {/* Serifa base do 4 */}
        <path d="M 463,620 L 471,620" />

        {/* Linha base dos números */}
        <path d="M 406,628 L 484,628" />
        {/* Canto inf esq */}
        <path d="M 406,628 L 401,633" />
        {/* Canto inf dir */}
        <path d="M 484,628 L 489,633" />

        {/* Ornamentos extras */}
        <path d="M 406,596 L 411,596" />
        <path d="M 479,596 L 484,596" />
      </g>

      {/* ROSTO/TESTA — "MV" crew tag — x=355-425, y=130-185 */}
      <g
        data-graffiti="face"
        fill="none"
        stroke="#ff2d55"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        filter="url(#glow-red)"
      >
        {/* Linha superior / coroa ornamental */}
        <path d="M 354,132 L 354,126 L 360,120 L 366,126 L 366,132" />
        <path d="M 372,132 L 372,116" />
        <path d="M 378,132 L 378,122 L 384,116 L 390,122 L 390,132" />
        <path d="M 396,132 L 396,122 L 402,116 L 408,122 L 408,132" />
        <path d="M 414,132 L 414,126 L 420,120 L 426,126 L 426,132" />

        {/* Linha de topo do frame */}
        <path d="M 350,132 L 430,132" />
        {/* Ornamento canto esq */}
        <path d="M 350,132 L 345,137" />
        {/* Ornamento canto dir */}
        <path d="M 430,132 L 435,137" />

        {/* M — quatro segmentos angulosos com serifas */}
        <path d="M 355,140 L 355,178" />
        <path d="M 355,140 L 363,155 L 371,140" />
        <path d="M 371,140 L 371,178" />
        {/* Serifa topo M esq */}
        <path d="M 351,140 L 359,140" />
        {/* Serifa topo M dir */}
        <path d="M 367,140 L 375,140" />
        {/* Serifa base M */}
        <path d="M 351,178 L 359,178" />
        <path d="M 367,178 L 375,178" />

        {/* Separador entre letras */}
        <path d="M 375,158 L 381,158" />

        {/* V — duas diagonais com serifas */}
        <path d="M 381,140 L 390,178" />
        <path d="M 400,140 L 390,178" />
        {/* Serifa topo V esq */}
        <path d="M 377,140 L 385,140" />
        {/* Serifa topo V dir */}
        <path d="M 396,140 L 404,140" />
        {/* Serifa base V */}
        <path d="M 386,178 L 394,178" />

        {/* Linha de base do frame */}
        <path d="M 350,184 L 430,184" />
        {/* Ornamento canto inf esq */}
        <path d="M 350,184 L 345,179" />
        {/* Ornamento canto inf dir */}
        <path d="M 430,184 L 435,179" />

        {/* Detalhe sublinhado */}
        <path d="M 355,188 L 405,188" />
        <path d="M 355,192 L 380,192" />
      </g>
    </svg>
  )
}
