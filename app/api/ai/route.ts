import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY!,
});

const BASE_PROMPT = `
Potensi Green Synthesis ZnO Nanoparticles dengan Ekstrak Daun
Phyllanthus niruri: Solusi Inovatif Mitigasi Emisi Gas Metana Melalui Aditif
Pakan Ruminansia
Catherine Noor1), Zahwa Tsuroyya Alisya Zahra2), Rona Ayyu Happyna 3), Jesslyn Beatrice1),
Ahmad Rizal Riswanda Danuartha1) Moh Sofi’ul Anam1)
1
Ilmu dan Industri Peternakan, Fakultas Peternakan, Universitas Gadjah Mada, Indonesia
2
Biologi, Fakultas Biologi, Universitas Gadjah Mada, Indonesia
3
Kedokteran Hewan, Fakultas Kedokteran Hewan, Universitas Gadjah Mada, Indonesia
*Penulis Korespondensi: m.sofiul.a@mail.ugm.ac.id

ABSTRAK
Emisi metana (CH₄) dari ternak ruminansia berkontribusi besar terhadap gas rumah kaca.
Penelitian ini bertujuan mengevaluasi potensi nanopartikel zinc oxide (n-ZnO) hasil green
synthesis menggunakan ekstrak daun meniran (Phyllanthus niruri) sebagai aditif pakan
untuk menekan produksi CH₄ dan meningkatkan efisiensi fermentasi rumen. n-ZnO
dikarakterisasi menggunakan SEM, XRD, dan FTIR, serta diuji secara in vitro dengan
empat perlakuan: kontrol, NZ1 (3%), NZ2 (5%), dan NZ3 (7%) dari bahan kering pakan.
Hasil menunjukkan n-ZnO memiliki struktur kristal wurtzite berukuran ±21 nm dan
morfologi heksagonal 114 nm. Suplementasi n-ZnO tidak berpengaruh nyata terhadap pH
rumen (p>0,05), namun cenderung meningkatkan kecernaan bahan kering hingga 39,5%
pada NZ3 (p>0,05) dan menurunkan rasio asetat:propionat (p<0,05), menandakan
pengalihan hidrogen menuju jalur pembentukan propionat. Total metanogen menurun
signifikan 6,22% (p<0,05) diikuti penurunan produksi CH₄ dari 6,73 menjadi 2,86 mL/300
mg BK (p<0,001). Secara keseluruhan, n-ZnO berbasis P. niruri aman bagi mikroba rumen
non methanogenic, meningkatkan efisiensi pakan, dan berpotensi sebagai aditif pakan
ramah lingkungan untuk mitigasi emisi metana.
Kata-kata kunci: metana, n-ZnO, in vitro gas test, daun meniran, green synthesis.

Pendahuluan
Emisi gas metana (CH4) merupakan kontributor utama terhadap efek rumah
kaca di atmosfer. Gas ini memiliki potensi pemanasan global sekitar 28 kali lebih
besar dibandingkan karbon dioksida (CO₂) serta berkorelasi erat dengan fenomena
global boiling (Króliczewska et al., 2023). Berdasarkan data dari Global Methane
Initiative (GMI) (2025), konsentrasi CH4 atmosferik terus mengalami peningkatan
signifikan dari tahun ke tahun. Sektor peternakan menjadi salah satu penyumbang
emisi CH4 terbesar di dunia mencapai 2.614,42 MMTCO2e bahkan lebih tinggi
dibandingkan sektor pertambangan batubara serta sektor minyak dan gas (GMI,
2025). Seekor sapi dewasa mampu mengemisikan CH4 berkisar 250 hingga 500
liter per hari melalui proses fermentasi enterik pakan (Króliczewska et al., 2023).
Salah satu upaya mitigasi emisi CH4 yang relevan dan krusial untuk dilakukan yaitu
melalui pemberian aditif pakan dengan kemampuan antimikrobia dan kemampuan
menekan produksi gas CH4 dari fermentasi enterik.
Penggunaan aditif pakan yang terintegrasi teknologi nanopartikel
dikembangkan menjadi salah satu inovasi alternatif dalam menekan produksi CH4
hasil fermentasi enterik pakan ternak ruminansia. Pemberian aditif pakan
nanopartikel ZnO memiliki keunggulan dalam penyerapannya oleh mikrobia rumen
karena ukuran yang kecil dan luas permukaan yang besar (Riazi et al., 2019).
Nanopartikel ZnO bersifat toksik pada methanogen generating microbes
diantaranya acetoclastic methanogens, hydrogenotrophic methanogens, dan
methylotrophic methanogens (Palangi et al., 2024). Nanopartikel ZnO memiliki
kekurangan yaitu dapat bersifat toksik pada ternak dan dapat meninggalkan toxic
by-products apabila disintesis dengan metode konvensional (Osman et al., 2024).
Metode pembuatan nanopartikel yang baik yaitu menggunakan metode green
synthesis dengan memanfaatkan senyawa bioaktif tanaman (Osman et al., 2024).
Ekstrak daun meniran diketahui mengandung senyawa flavonoid yang cukup
tinggi dan dapat berperan sebagai bioreductor serta capping agent untuk
mensintesis nanopartikel ZnO. Studi menunjukkan bahwa nanopartikel ZnO (nZnO) berbasis ekstrak meniran memiliki angka minimum bactericidal
concentration (MBC) yang rendah dan memiliki kemampuan antimikrobia yang
baik (Fakhirah et al., 2024). Selain itu, penggunaan nanopartikel ZnO mampu
menstabilkan ekosistem dan pertumbuhan mikroba rumen serta meningkatkan
sintesis protein mikrobia dan efisiensi energi pada ternak (Palangi et al., 2024; Chen
et al., 2011). Nanopartikel ZnO juga memiliki kemampuan hydrogen sinks yang
dapat mendisrupsi kinerja methanogenic bacteria serta mampu mengubah alur
hydrogen untuk sintesis asam propionat sehingga ketersediaan energi pada ternak
meningkat (Ungerfeld et al., 2020). Oleh karena itu, penelitian ini dilakukan untuk
mengeksplorasi potensi green synthesized nanopartikel ZnO dengan ekstrak daun
meniran menekan produksi gas CH4 hasil dari fermentasi enterik pakan tanpa
memberikan efek buruk pada profil mikrobia rumen dan profil fermentasi pakan di
dalam rumen.


Metode
Lokasi dan Waktu Riset
Riset ini dilakukan dengan waktu pelaksanaan 4 bulan dengan lokasi
pelaksanaan riset yaitu Laboratorium Sistematika Tumbuhan Fakultas Biologi
UGM untuk determinasi tanaman meniran, Laboratorium Tropical Animal
Research Center UGM (TARC) untuk pembuatan produk nanopartikel ZnO (gnZnO) dan Laboratorium Teknologi Makanan Ternak Fakultas Peternakan UGM
untuk pengujian in vitro.
Alat dan Bahan
Alat Riset
Alat yang digunakan pada riset ini meliputi oven MOV-112, grinder Wiley
Mill, muffle furnace KM-420, scanning electron microscope (SEM) SSX-550, xray diffraction (XRD) Bruker D8, fourier transform infrared spectroscopy (FTIR)
IRAffinity-1S, kjeldahl digester KD-420F, mikroskop Olympus CX22 dengan
Optilab Viewer 4, kit ekstraksi DNA Favorgen dan instrumen real-time PCR, Gas
Chromatography (GC) Shimadzu 14B, dan instrumen spektrofotometer UV-vis
UV-1280.
Bahan Riset
Bahan yang digunakan dalam riset ini meliputi daun meniran (Phyllanthus
niruri), aquadest, (CH₃COO)₂Zn.2H₂O 0,1M, NaOH 0,1M, reagen buffer in vitro
gas test, cairan rumen, reagen uji kadar protein mikrobia dan NH3, reagen uji VFA,
dan reagen uji q-PCR serta subjek riset yaitu sapi fistula bangsa Bali (Bos
sondaicus) berumur 6 tahun.
Metode Pengumpulan Data
Determinasi dan Ekstraksi Daun Meniran (Phyllanthus niruri)
Sampel daun meniran (Phyllanthus niruri) dikoleksi dari Desa Sardonohardjo,
Ngaglik, Sleman, Daerah Istimewa Yogyakarta. Daun P. niruri yang dikoleksi
dilakukan determinasi di Laboratorium Sistematika Tumbuhan Fakultas Biologi
UGM. Ekstraksi daun P. niruri dilakukan dengan metode hot maceration pada suhu
60oC selama 10 menit dalam pelarut aquadest (1:10, b/v). Ekstrak disaring
menggunakan kertas saring Whatman No.1 dan filtrat disimpan pada suhu 4oC
sampai digunakan untuk preparasi ZnO nanopartikel
Green Synthesis Nanopartikel ZnO
Metode green synthesis ZnO nanopartikel dilakukan dengan modifikasi
metode sebelumnya (Fakhirah et al., 2024). Zn(CH₃COO)2.2 H2O 0,1 M dalam 50
mL aquadest diaduk dengan magnetic stirrer selama 10 menit. Ekstrak daun
meniran diteteskan pada larutan Zn(CH₃CO₂)₂ 0,1M sebanyak 2,5 mL secara
dropwise selama 2 jam dengan pengadukan konstan menggunakan hotplate
magnetic stirrer bersuhu 60oC. Ke dalam larutan ditambahkan NaOH 0,1 M agar
pH tetap berada pada angka 12. Larutan koloid nanopartikel disentrifugasi dengan
kecepatan 6.000 rpm selama 5 menit kemudian dibilas menggunakan aquadest.
Residu kemudian dikeringkan menggunakan oven bersuhu 105oC selama 24 jam

hingga berwarna putih pucat. Produk nanopartikel ZnO hasil green synthesis yang
kemudian disebut gn-ZnO dikalsinasi pada suhu 550oC selama 30 menit pada
muffle furnace.
Karakterisasi gn-ZnO
Karakterisasi gn-ZnO dilakukan menggunakan beberapa metode diantaranya
SEM, PSA, XRD, dan FTIR. Karakterisasi menggunakan SEM bertujuan untuk
mengetahui morfologi permukaan gn-ZnO. Karakterisasi menggunakan PSA
bertujuan untuk mengetahui ukuran distribusi paertikel gn-ZnO. Karakterisasi
menggunakan XRD bertujuan untuk mengetahui struktur kristal serta purity phase
dari gn-ZnO. Karakterisasi menggunakan FTIR bertujuan untuk mengetahui
karakteristik struktur berdasarkan gugus fungsional dan interaksi molekuler pada
gn-ZnO.
In Vitro Gas Test
In vitro gas test yang dilakukan menggunakan metode Menke dan Steingass
(Krieg et al., 2017). Cairan rumen diambil dari sapi bangsa Bali (Bos sondaicus)
sebagai donor mikrobia setelah ethical clearance diterbitkan oleh Komisi Etik FKKMK UGM (KE/FK/1438/EC/2025). Cairan rumen disaring kemudian
dicampurkan buffer saliva yang telah diinkubasi pada suhu 40°C selama 24 jam
dengan perbandingan 1:2 (v/v) untuk membuat rumen liquor-buffer solution (RLB).
Sebanyak 30 mL RLB dimasukkan dalam syringe 100 mL yang telah berisi pakan
basal dan gn-ZnO sebanyak 300 mg bahan kering (BK) lalu diinkubasi selama 48
jam pada suhu 40°C dan kondisi anaerob. Produksi gas diukur pada waktu inkubasi
jam ke-1, 2, 4, 8, 10, 12, 24, 36 dan 48. Pada penelitian ini terdapat empat perlakuan
yaitu perlakuan kontrol (pakan basal), NZ1 (pakan basal + gn-ZnO dosis 3% BK),
NZ2 (pakan basal + gn-ZnO dosis 5% BK), dan NZ3 (pakan basal + gn-ZnO dosis
7% BK). Gas dikoleksi untuk analisis kadar gas CH4. Sampel substrat yang
dikoleksi akan dilakukan uji kecernaan meliputi kecernaan bahan kering (KcBK)
dan kecernaan bahan organik (KcBO). Sampel filtrat yang dikoleksi akan dilakukan
uji profil fermentasi rumen meliputi pH VFA, NH3, dan protein mikrobia (PM) serta
isolasi DNA untuk mengetahui jumlah methanogenic bacteria.
Analisis Kadar Gas CH4
Pengujian kadar gas CH4 dilakukan dengan alat GC Shimadzu 14B dengan
detektor bersuhu 150oC, kolom bersuhu 32oC, dan injektor bersuhu 100oC. Gas
diambil dan diinjeksi pada sampling valve. Gas akan masuk ke dalam kolom dan
dipisahkan dengan gas lain lalu melalui detektor akan teridentifikasi kadar gas CH4
dalam bentuk peak di komputer. Peak yang muncul akan diinterpretasi dalam
bentuk angka sebagai area dan angka tersebut akan dimasukkan ke dalam
persamaan untuk mendapatkan kadar gas CH4 dalam satuan part per million (ppm).
Analisis Profil Fermentasi Rumen
Sampel filtrat yang dikoleksi akan diuji kadar pH, kadar protein mikrobia
(PM), kadar NH3, dan kadar volatile fatty acids (VFA). Uji kadar pH dilakukan
dengan menggunakan pH meter dan dibaca dengan tiga kali replikasi. Uji kadar


protein mikrobia dilakukan dengan metode Lowry (Putri et al. 2021). Sampel cairan
rumen dimasukkan ke dalam eppendorf sebanyak 1,5 ml kemudian disentrifugasi
pada kecepatan 15000 rpm selama 10 menit lalu presipitat dikoleksi dan
ditambahkan NaOH 1N dan diinkubasi pada waterbath bersuhu 90oC selama 10
menit. Pasca inkubasi, sampel divortex lalu diencerkan sebanyak lima kali
pengenceran. Sampel pasca pengenceran diambil sebanyak 0,5 ml kemudian
dicampur dengan larutan lowry B dan diinkubasi selama 10 menit pada suhu ruang
dilanjutkan dengan penambahan larutan lowry A dan diinkubasi selama 30 menit
pada suhu ruang. Sampel dibaca pada absorbansi 750 (λ) nm. Uji kadar NH3
dilakukan dengan metode Raneff (Räisänen et al., 2025; Chaney dan Marbach,
1962). Sampel cairan rumen diambil sebanyak 0,4 ml dan ditambahkan larutan
sodium tungstate 10% (b/v) sebanyak 0,2 ml dan larutan H2SO4 1N sebanyak 0,2
ml. Campuran larutan disentrifugasi pada kecepatan 15000 rpm. Supernatan sampel
diencerkan sebanyak lima kali pengenceran lalu dikoleksi 20 µl kemudian
ditambahkan larutan phenol sebanyak 2,5 ml dan larutan hypochloride sebanyak
2,5 ml. Campuran larutan kemudian diinkubasi pada waterbath bersuhu 40oC
selama 30 menit hingga terbentuk warna biru. Sampel dibaca pada absorbansi 630
(λ) nm. Uji VFA dilakukan dengan preparasi sampel terlebih dahulu. Sebanyak 1
ml sampel dicampurkan dengan larutan metafosfat 25% sebanyak 0,2 ml kemudian
dihitung konsentrasinya menggunakan gas chromatography dengan 80/100
Chromosorb WAW packed column dengan gas He sebagai gas carrier dan
dilengkapi flame ionization detection.
Analisis Kecernaan Pakan
Analisis kecernaan pakan dilakukan dengan menyaring substrat pakan pasca
in vitro gas test dilakukan menggunakan gooch crucible yang telah dilapisi
glasswool. Substrat yang tersaring kemudian dikeringkan pada oven bersuhu 105oC
selama 24 jam. Pasca pengovenan, sampel ditimbang dan bobotnya dimasukkan ke
dalam perhitungan untuk menentukan jumlah bahan kering tercerna dan nilai
kecernaan bahan kering (KcBK). Sampel kemudian ditanur dengan alat muffle
furnace pada suhu 550oC selama 2 jam. Pasca penanuran, sampel ditimbang
kembali untuk menentukan jumlah bahan organik tercerna dan nilai kecernaan
bahan organik (KcBO).
Isolasi DNA dan Analisis Real-Time Polymerase Chain Reaction (RT-PCR)
Mikrobia Rumen
Isolasi DNA dan analisis real-time PCR dilakukan dengan koleksi cairan
rumen pasca inkubasi. Isolasi DNA dilakukan dengan menggojok 1 mL sampel
menggunakan vortex selama 1 menit lalu DNA diisolasi menggunakan kit ekstraksi
DNA GF-1. Analisis RT-PCR dilakukan menggunakan pasangan primer Bio-Rad
CFX96 dengan suhu annealing 55oC. Campuran reagen total 10 µL terdiri dari
LunaVR Universal PCR Master Mix 5,0 µL, primer forward dan reverse masingmasing 0,2 µL, template DNA murni dengan konsentrasi akhir 0,01 mg/mL 3 µL,
dan aquadest 1,6 µL. Primer PCR spesifik mikroba untuk total methanogens

archaea yaitu forward: TTCGGTGGATCDCARAGRGC dan reverse:
GBARGTCGWAWCCGTAGAATCC
sedangkan
untuk
bakteri
Methanobacteriales yaitu forward: CGWAGGGAAGCTGTTAAGT, reverse:
TACCGTCGTCCACTCCTT. Primer PCR spesifik bakteri non methanogenic
untuk Ruminococcus albus yaitu forward: CCCTAAAAGCAGTCTTAGTTCG
dan reverse: CCTCCTTGCGGTTAGAACA dan Butyrivibrio fibrisolvens dengan
forward:
ACCGCATAAGCGCACGGA
dan
reverse:
CGGGTCCATCTTGTACCGATAAAT. Primer tersebut menargetkan daerah 16S
rDNA dengan teknik qPCR menggunakan peralatan real time -PCR.
Metode Analisis Data
Data karakterisasi gn-ZnO disajikan secara deskriptif. Analisis data dilakukan
dengan one-way analysis of variance (ANOVA) menggunakan aplikasi Statistical
Package for the Social Sciences (SPSS) untuk menilai perbedaan hasil kelompok
kontrol dan kelompok uji. Perbedaan hasil diuji lanjut menggunakan Duncan’s New
Multiple Range Test (DMRT) untuk menilai signifikansi dengan p-value<0,05.
Data disajikan dalam bentuk rerata dan standard error mean (SEM).
Hasil dan Pembahasan
Karakterisasi gn-ZnO dengan Ekstrak Daun Meniran (Phyllanthus niruri)
sebagai Capping Agent
Berdasarkan hasil uji FTIR, nanopartikel ZnO hasil green synthesis
menggunakan ekstrak daun meniran (P. niruri) yang kemudian disebut gn-ZnO
memperoleh spektrum FTIR antara 300 cm-1 hingga 4000 cm-1 (Gambar 1A).
Puncak serapan lebar pada gelombang 3448,72 cm-1 merupakan representasi dari
serapan gugus O-H. Puncak serapan pada gelombang 2924,09 cm-1 dan 2854,05
cm-1 menunjukkan adanya senyawa alifatik C-H sedangkan pada gelombang
1627,92 cm-1 menunjukkan senyawa C=C aromatik yaitu flavonoid sebagai
senyawa bioaktif dan capping agent dalam proses pembentukan nanopartikel ZnO
dari ekstrak daun meniran. Puncak serapan antara 1550-1650 cm-1 menunjukkan
adanya senyawa bioaktif seperti polyphenol. Puncak serapan antara gelombang
1118,71-1381,03 cm-1 menunjukkan senyawa gugus C-O-H fungsional yang
terdapat pada ekstrak daun meniran. Pita serapan pada gelombang 516,62 dan
462,92 cm-1 terdapat vibrasi ulur yang terjadi dan menandakan interaksi antara
senyawa zinc (Zn) dan oksigen (O) membentuk kompleks ZnO. Palangi et al.,
(2024) menyatakan bahwa pita serapan pada gelombang 580 cm-1, 622 cm-1, dan
785 cm-1 adalah vibrasi ulur dari ZnO.
(A)
(B)

7

(C)

Gambar 1. Hasil uji karakteristik gn-ZnO. (A) Spektrum FTIR sampel gn-ZnO.
(B) Difraktogram XRD sampel gn-ZnO. (C) Morfologi permukaan gn-ZnO. (D)
Distribusi ukuran gn-ZnO
Selanjutnya, hasil karakterisasi XRD memperlihatkan bahwa fase ZnO telah
terbentuk secara optimal dengan struktur kristal heksagonal wurtzite, yang ditandai
dengan puncak difraksi intensitas maksimum pada sudut 36,28° dengan indeks
Miller (101) (Gambar 2B). Puncak ini sesuai dengan hasil yang dilaporkan oleh
Sari et al. (2021) yang juga menunjukkan sudut difraksi serupa. Ukuran kristalit
rata-rata nanopartikel dihitung menggunakan rumus Scherrer dan diperoleh hasil
sebesar 21,84 nm, yang merefleksikan pengaruh metode sintesis terhadap ukuran
kristalit produk. Pengujian lebih lanjut melalui analisis SEM menunjukkan
morfologi permukaan dan ukuran nanopartikel ZnO berada pada kisaran 114 nm
(Gambar 2C). Bentuk nanopartikel yang didapatkan dari hasil uji SEM
menunjukkan bentuk hexagonal. Bentuk hexagonal ini selaras dengan puncak
difraksi yang diperoleh dari uji XRD. Bentuk ini terkonfirmasi dari penelitian
Fakhirah et al. (2024) yang menyatakan bahwa bentuk nanopartikel ZnO adalah
truncated hexagonal dan memiliki puncak difraksi pada 2θ 30-80o. Oleh karena itu
nanopartikel yang terbentuk adalah nanopartikel zinc dengan ukuran 114
nanometer.
Pengaruh gn-ZnO terhadap Profil Fermentasi Rumen
Tabel 1. Pengaruh pemberian aditif gn-ZnO terhadap profil fermentasi rumen
Variabel
pH
Protein mikrobia
(mg/100ml)
NH3 (mg/dl)
Total VFA (mM)
Asetat (%)
Propionat (%)
Butirat (%)
Asetat:Propionat
abc

CTRL
7,21
105,70

Perlakuan
NZ1
NZ2
7,10
7,13
108,42
119,95

NZ3
7,20
124,90

SEM

p-value

0,0231
3,78

0,255
0,226

26,98
76,35
71,76a
20,07c
8,18b
3,58a

31,18
78,92
71,20bc
20,36b
8,40a
3,51b

26,90
76,61
71,13c
20,68a
8,19b
3,44c

1,08
0,50
0,67
0,59
0,32
0,01

0,095
0,145
<0,001
<0,001
0,048
<0,001

32,36
76,06
71,44b
20,40b
8,21b
3,49b

Superskrip yang berbeda pada baris yang sama menunjukkan perbedaan signifikan (p<0,05); CTRL: pakan basal tanpa
penambahan aditif; NZ1: kontrol + gn-ZnO 3%; NZ2: kontrol + gn-ZnO 5%; NZ3: kontrol + gn-ZnO 7%; VFA: volatile
fatty acids; SEM: standard error of the mean.

8

Profil fermentasi pakan pasca pemberian gn-ZnO dapat dipengaruhi oleh
berbagai faktor. Data pada Tabel 1 menunjukkan bahwa pemberian gn-ZnO 3%,
5%, dan 7% tidak menunjukkan perbedaan yang signifikan pada nilai pH, kadar
protein mikrobia, NH3, dan total VFA dibandingkan dengan kontrol (p>0,05).
Namun demikian, pemberian gn-ZnO memberikan pengaruh nyata terhadap fraksi
VFA diantaranya kadar asetat, propionat, butirat, serta rasio asetat:propionat
(p<0,05). Nilai pH dalam rumen dipengaruhi oleh pencernaan pakan yang
mempengaruhi kadar NH3, kadar protein mikrobia, dan konsentrasi VFA. Nilai pH
rumen diantara 5 hingga 7 menjadi indikator rumen dalam kondisi optimal (Zain et
al., 2024). Perbedaan tidak nyata pada kadar NH3 dan kadar protein mikrobia
dikarenakan kondisi optimal rumen sehingga NH3 yang tersedia dapat diabsorpsi
dinding rumen dan sebagian digunakan oleh mikrobia rumen untuk mensintesis
protein mikrobia (Zain et al., 2024). Hal ini selaras dengan kondisi optimal rumen
yang tidak berdampak nyata pada total VFA. Penurunan signifikan yang terjadi
pada kadar asetat selaras dengan kadar propionat yang meningkat signifikan seiring
peningkatan dosis gn-ZnO. Penurunan kadar asetat dan peningkatan kadar
propionat mempengaruhi penurunan rasio asetat:propionat. Penurunan kadar asetat
dapat dipengaruhi oleh penurunan tingkat kecernaan pakan yang mungkin terjadi
karena pengaruh sifat antimikrobia aditif pakan (Singh et al., 2019). Peningkatan
kadar propionat dapat dipengaruhi oleh kemampuan ZnO dalam mengubah jalur H2
untuk sintesis propionat sehingga mempengaruhi penurunan rasio asetat:propionat
(Palangi et al.,2024).
Aditif gn-ZnO terhadap Kecernaan Nutrien Pakan
Tabel 2. Pengaruh pemberian aditif gn-ZnO terhadap Kecernaan Nutrien Pakan
Variabel (%)
KcBK
KcBO

CTRL
38,52b
97,50a

Perlakuan
NZ1
NZ2
43,48ab
48,49ab
94,68ab
92,48bc

NZ3
53,72a
87,18c

SEM

p-value

2,0567
1,2613

0,054
0,003

abc

Superskrip yang berbeda pada baris yang sama menunjukkan perbedaan signifikan (p<0,05); CTRL: pakan basal tanpa
penambahan aditif; NZ1: kontrol + gn-ZnO 3%; NZ2: kontrol + gn-ZnO 5%; NZ3: kontrol + gn-ZnO 7%; KcBK: kecernaan
bahan kering; KcBO: kecernaan bahan organik; SEM: standard error of the mean.

Nilai kecernaan pakan dapat dipengaruhi oleh ekosistem mikrobia rumen dan
komposisi pakan. Data pada Tabel 2 menunjuukan bahwa penambahan gn-ZnO
pada dosis 7% (NZ3) cenderung meningkatkan KcBK, namun demikian perlakuan
NZ2 dan NZ3 secara nyata menurunkan KcBO. Abdollahi et al. (2020) menyatakan
bahwa peningkatan kecernaan nutrien berkaitan dengan aktivitas permukaan yang
lebih besar dan kapasitas penyerapan yang lebih tinggi dari n-ZnO. Sifat tersebut
memungkinkan stimulasi pertumbuhan mikroorganisme perombak serat di dalam
rumen, sehingga berkontribusi terhadap peningkatan efisiensi pencernaan
khususnya pada peningkatan KcBK dengan kecenderungan signifikan (p=0,054).
Tingkat kecernaan bahan organik pada suplementasi tingkat tinggi terjadi
penurunan signifikan dari 97,50% (kontrol) menjadi 92,48% (NZ2) dan 87,18%
(NZ3) (p<0,05). Penurunan ini dapat terjadi akibat tingkat cerna atau solubility gn-

9

ZnO yang rendah oleh mikrobia rumen sehingga partikel gn-ZnO yang tersisa lebih
banyak seiring peningkatan dosis. Vigh et al. (2023) menyatakan bahwa zinc
memiliki tingkat solubility yang rendah di rumen ternak. Kecenderungan Zinc
untuk menempel pada dinding sel bakteri dibandingkan diserap oleh bakteri juga
dapat mengindikasikan penurunan nilai kecernaan bahan organik (Vigh et al.,
2023). Secara keseluruhan, suplementasi gn-ZnO memiliki kecenderungan
meningkatkan kecernaan bahan kering (KcBK), namun demikian pada dosis tinggi
(NZ2 dan NZ3) perlu diperhatikan lebih lanjut karena menyebabkan penurunan
nilai kecernaan bahan organik (KcBO) karena residu zinc yang memiliki tingkat
solubility yang rendah di rumen.
Pengaruh Suplementasi gn-ZnO terhadap Profil Mikrobia Rumen
Tabel 3. Profil mikrobia rumen pasca suplementasi gn-ZnO
NZ3
11,49

SEM

p-value

Ruminococcus albus

CTRL
11,35

Perlakuan
NZ1
NZ2
11,37
11,47

0,3169

0,297

Butyrivibrio fibrisolvens

8,09

8,12

8,15

8,25

0,2565

0,125

Methanobacteriales

11,74

11,71

11,55

11,49

0,5367

0,307

Total methanogens

b

b

ab

a

0,1104

0,038

Variabel (log copy/ml)

12,38

12,18

11,91

11,61

abc

Superskrip yang berbeda pada baris yang sama menunjukkan perbedaan signifikan (p<0,05); CTRL: pakan basal tanpa
penambahan aditif; NZ1: kontrol + gn-ZnO 3%; NZ2: kontrol + gn-ZnO 5%; NZ3: kontrol + gn-ZnO 7%; KcBK: kecernaan
bahan kering; KcBO: kecernaan bahan organik; SEM: standard error of the mean.

Profil mikrobia rumen dipengaruhi oleh substrat pakan yang dicerna. Data
pada Tabel 3 menunjukkan bahwa suplementasi gn-ZnO tidak memberikan
pengaruh nyata terhadap kelimpahan Ruminococcus albus, Butyrivibrio
fibrisolvens, dan Methanobacteriales pada seluruh perlakuan (p > 0,05). Namun
demikian, populasi total methanogens mengalami penurunan yang signifikan
(p<0,05) pada kelompok yang menerima suplementasi gn-ZnO dibandingkan
dengan kontrol. Nilai tertinggi populasi total methanogens tercatat pada kelompok
kontrol (12,38 log copy/mL), sedangkan nilai terendah terdapat pada kelompok
NZ3 (11,61 log copy/mL). Perbedaan tidak nyata antara kontrol dengan perlakuan
pada jumlah bakteri Ruminococcus albus dan Butyrivibrio fibrisolvens memiliki
hubungan dengan tingkat kecernaan pakan (Tabel 2) dan kadar asam butirat (Tabel
1). Peningkatan tidak signifikan pada jumlah bakteri Ruminococcus albus dapat
menjadi faktor yang mempengaruhi kecenderungan peningkatan pada nilai
kecernaan bahan kering (Tabel 2) sedangkan peningkatan tidak signifikan pada
jumlah bakteri Butyrivibrio fibrisolvens menjadi faktor peningkatan signifikan pada
kadar butirat (Tabel 1). Nilai kecernaan pakan dan kadar butirat dipengaruhi jumlah
bakteri Ruminococcus albus dan Butyrivibrio fibrisolvens (Petric et al., 2024).
Temuan ini mengindikasikan bahwa peningkatan level suplementasi gn-ZnO
berpotensi menekan aktivitas methanogenic archaea di dalam rumen tanpa
mempengaruhi jumlah non-methanogenic bacteria, yang selanjutnya dapat
berkontribusi terhadap penurunan produksi metana selama proses fermentasi
rumen. Hal ini selaras dengan penemuan Vigh et al. (2023) bahwa zinc mampu

10

menempel di dinding sel bakteri, memberikan kerusakan, dan berujung pada
lisisnya bakteri selaras dengan jumlah total methanogens pada penelitian ini.
Pengaruh Suplementasi gn-ZnO terhadap Produksi Gas CH4
Tabel 4. Pengaruh suplementasi gn-ZnO terhadap produksi gas CH4
Variabel
(ml/300mg BK)
Produksi gas CH4

CTRL
6,73c

Perlakuan
NZ1
NZ2
b
4,35
4,32b

NZ3
2,86a

SEM

p-value

0,4492

<0,001

Data pada Tabel 4 menunjukkan pemberian gn-ZnO dengan pada dosis NZ1,
NZ2, dan NZ3 menunjukkan penurunan yang signifikan (p<0,05). Penurunan
produksi gas CH4 dapat dipengaruhi oleh gn-ZnO yang memiliki sifat antimikrobia
sehingga methanogenic bacteria lisis dan produksi gas CH4 dapat ditekan (Palangi
et al., 2024). Hal ini selaras dengan jumlah methanogenic bacteria pada Tabel 3
yaitu Methanobacteriales yang menunjukkan penurunan tidak signifikan dan total
methanogens yang menurun signifikan pada dosis NZ3. Selain itu, penurunan
produksi gas CH4 dapat ditinjau dari perubahan rasio asetat:propionat. Riazi et al.
(2019) menyatakan bahwa pemberian aditif pakan nanopartikel zinc dapat
mempengaruhi penurunan rasio asetat:propionat karena perubahan jalur H2 menuju
aseptor elektron seperti propionat sehingga tidak dapat digunakan oleh
methanogenic bacteria sebagai prekursor pembentukan gas CH4. Hal ini diperkuat
oleh temuan Wang et al. (2023) bahwa peningkatan kadar propionat kerap
berhubungan dengan penurunan produksi gas CH4. Oleh karena itu, pemberian gnZnO mampu menekan produksi gas CH4 hasil fermentasi enterik pakan.
Kesimpulan
Penelitian ini membuktikan bahwa nanopartikel zinc oxide (gn-ZnO) hasil
green synthesis menggunakan ekstrak daun Phyllanthus niruri berpotensi besar
sebagai aditif pakan ramah lingkungan untuk mitigasi emisi gas metana pada ternak
ruminansia. Suplementasi gn-ZnO pada berbagai dosis (3%, 5%, dan 7% dari bahan
kering pakan) tidak berpengaruh nyata terhadap pH rumen (rata-rata 7,10–7,21),
kadar protein mikrobia (105,70–124,90 mg/100 mL), konsentrasi NH₃ (26,90–
32,36 mg/dL), maupun total VFA (76,06–78,92 mM), sehingga dapat disimpulkan
aman terhadap aktivitas mikroba rumen. Secara khusus, suplementasi n-ZnO
cenderung meningkatkan kecernaan bahan kering (KcBK) dari 38,52% pada
kontrol menjadi 53,72% pada dosis tertinggi (NZ3). Namun, nilai kecernaan bahan
organik (KcBO) menurun signifikan pada keseluruhan dosis. Selain itu, pemberian
gn-ZnO tidak berdampak nyata pada profil bakteri non methanogenic, namun
demikian pemberian gn-ZnO menyebabkan penurunan signifikan pada populasi
total metanogen khususnya pada dosis NZ3 dari 12,38 menjadi 11,61 log copy/mL
(p<0,05) sehingga menandakan adanya penghambatan nyata terhadap aktivitas
methanogenic bacteria. Perubahan profil fermentasi rumen menunjukkan
penurunan proporsi asetat dari 71,76% menjadi 71,13% serta peningkatan
propionat dari 20,07% menjadi 20,68%, dengan rasio asetat:propionat menurun dari
3,58 menjadi 3,44 (p<0,001). Pergeseran ini menandakan terjadinya redireksi aliran

hidrogen dari jalur metanogenesis menuju sintesis propionat, yang berkontribusi
terhadap penurunan produksi metana. Secara keseluruhan, n-ZnO hasil green
synthesis berbasis ekstrak daun Phyllanthus niruri terbukti aman, meningkatkan
efisiensi pencernaan pakan, dan berpotensi menekan emisi metana melalui
penghambatan aktivitas metanogenik serta perbaikan utilisasi hidrogen. Penelitian
lanjutan secara in vivo direkomendasikan untuk menilai efektivitas jangka panjang,
menentukan dosis optimal, serta mengevaluasi dampaknya terhadap performa
produksi dan keberlanjutan lingkungan.

berdasarkan dokumen di atas, tolong jawab pertanyaan ini. Langsung keluarkan jawaban seperti layaknya anda seorang chatbot. jangan gunakan hypermark seperti bold dan italic, gunakan text raw saja. Tidak perlu mention sumber referensi dokumen ini. Cukup katakan saja langsung jawabannya
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: BASE_PROMPT + message,
    });
    return NextResponse.json({
      text: response.text,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate AI response." },
      { status: 500 },
    );
  }
}
