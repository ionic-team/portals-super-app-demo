//
//  NewsItemView.swift
//  Supernova
//
//  Created by Steven Sherry on 6/5/23.
//

import SwiftUI
import ComposableArchitecture
import MarkdownUI

struct NewsItemView: View {
    let store: StoreOf<NewsFeature>
    
    var body: some View {
        WithViewStore(store) { vs in
            ScrollView(.vertical) {
                VStack(alignment: .leading, spacing: 8) {
                    Markdown(vs.body)
                }
            }
        }
    }
}

struct NewsItemView_Previews: PreviewProvider {
    static var previews: some View {
        NewsItemView(
            store: .init(
                initialState: NewsItem(
                    title: "Lorem Ipsum",
                    id: 0,
                    body: """
                    # De amanti
                    
                    ## Natorum quia
                    
                    Lorem markdownum dixit. Ergo nec et sacrilegos commissas dixit.
                    
                    ## Conreptus coniunx Maeandros praesens germanae ad Phasidos
                    
                    Est ceris visa pectine: murmur ubi sua, repetunt fetus vetitorum habemus! Litore
                    quem facta gurgite tibi non convicia: et: tibi uno et *mihi* virorum, invisa?
                    Quod ima arida heros madentis: cum arceat tumulo, artus [totos atque
                    undis](http://mihi.io/). Conclamat quid erat nectar erit fugacibus *et* linguae
                    deterrere color, pudet.
                    
                    Arva **iuxta flammis** caecoque magna furoris et ordine cernis; omnis non dapes
                    valebant vicit quas inque mea oscula suoque. Timidissime simus factus solet
                    figura moenibus pro flore invidia vota, partes silva. Sonus sed datae, toto nate
                    hebeti nescio more arserat mihi [Cartheia](http://quod.org/redditque.php) aegram
                    portabant posito inveniunt, et! Erit pro crudelia pectus haurit et nuper tu
                    inroravit exarsit sputantem, prius Cecropis maerens loci. Sonat precibus
                    deducit, mox ius, nec illud; restagnantis absit, **magnis aliter**!
                    
                    ## Volat est fontis arsit silva caput aurum
                    
                    ```swift
                    let thing = Thing()
                    thing.hello()
                    ```
                    
                    Nec pro pennis negat sororia illuc sigillis purpureus altoque se umbras adnuit.
                    Hoc habe esset dimovit purpureus auxilio. Iam tertia canum quoque cornua, nec
                    cessit contingere arva proelia Caucason, cupiens. Velamina illas Parnasi.
                    
                    Et arborei inque chrysolithi unum, nisi et corpore, arte. Quid scelus audistis
                    odiumque At tanto solito *pependit tremulis canes* hic publica Inachus culmine.
                    Nostro albis dignissima Lyrnesia vitta fetus terris, adesse quae. Lumina
                    spumantiaque Dictys patulos: spinae, novena, ut rerum, mundi qui et pinguis
                    oculos, et.
                    
                    ## Nec etiam sociorum proxima natura
                    
                    Causa quod non rursus tot sed munera saxa nomen, moderatus natus. Non transit
                    Iuppiter odoribus dubitare ubi videbar Perseus. Vidit illos chori tamen
                    falleret, pharetram Aeoliden celerique cognita partimque est, est huc omina
                    capta simulacra quondam. Et Minervae in quidem circumflua subdita tollens inter:
                    clipeo aede increpat, quod. Ostendisse locus.
                    
                    1. Per haud inter admisso omnemque coepit ipsamque
                    2. Montibus Cnosiacas vincinaque molli
                    3. Gorgoneis a despexit
                    3. Comitesque quique
                    3. Deus quaque doleo functa est comae indice
                    3. Movebere fortuna pependit quae
                    
                    Grandiaque ignis voluntas sanguine est vipereos quibus Ardea commune. Pervia
                    successore vocassent de humus! Et eget; sua Phoebus tellus, et suoque,
                    circumstant habenas mutua Aeolon ponitur, a. Penetralia riget vehebat turbantes
                    validos: lacte amantem Hippotades bimembres timidi. Non enim lacertos penates
                    latere albentibus uterque habenas Deianira formas tumulavit reducunt vellem?
                    """
                ),
                reducer: NewsFeature()
            )
        )
        .padding([.leading, .trailing])
    }
}
