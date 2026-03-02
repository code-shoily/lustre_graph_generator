-module(lustre@element@mathml).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/lustre/element/mathml.gleam").
-export([merror/2, mphantom/2, mprescripts/2, mrow/2, mstyle/2, semantics/2, mmultiscripts/2, mover/2, msub/2, msubsup/2, msup/2, munder/2, munderover/2, mroot/2, msqrt/2, annotation/2, annotation_xml/2, mfrac/2, mn/2, mo/2, mi/2, mpadded/2, ms/2, mspace/1, mtable/2, mtd/2, mtext/2, mtr/2]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-file("src/lustre/element/mathml.gleam", 23).
?DOC("\n").
-spec merror(
    list(lustre@vdom@vattr:attribute(YQG)),
    list(lustre@vdom@vnode:element(YQG))
) -> lustre@vdom@vnode:element(YQG).
merror(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"merror"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 31).
?DOC("\n").
-spec mphantom(
    list(lustre@vdom@vattr:attribute(YQM)),
    list(lustre@vdom@vnode:element(YQM))
) -> lustre@vdom@vnode:element(YQM).
mphantom(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mphantom"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 39).
?DOC("\n").
-spec mprescripts(
    list(lustre@vdom@vattr:attribute(YQS)),
    list(lustre@vdom@vnode:element(YQS))
) -> lustre@vdom@vnode:element(YQS).
mprescripts(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mprescripts"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 47).
?DOC("\n").
-spec mrow(
    list(lustre@vdom@vattr:attribute(YQY)),
    list(lustre@vdom@vnode:element(YQY))
) -> lustre@vdom@vnode:element(YQY).
mrow(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mrow"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 55).
?DOC("\n").
-spec mstyle(
    list(lustre@vdom@vattr:attribute(YRE)),
    list(lustre@vdom@vnode:element(YRE))
) -> lustre@vdom@vnode:element(YRE).
mstyle(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mstyle"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 63).
?DOC("\n").
-spec semantics(
    list(lustre@vdom@vattr:attribute(YRK)),
    list(lustre@vdom@vnode:element(YRK))
) -> lustre@vdom@vnode:element(YRK).
semantics(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"semantics"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 73).
?DOC("\n").
-spec mmultiscripts(
    list(lustre@vdom@vattr:attribute(YRQ)),
    list(lustre@vdom@vnode:element(YRQ))
) -> lustre@vdom@vnode:element(YRQ).
mmultiscripts(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mmultiscripts"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 81).
?DOC("\n").
-spec mover(
    list(lustre@vdom@vattr:attribute(YRW)),
    list(lustre@vdom@vnode:element(YRW))
) -> lustre@vdom@vnode:element(YRW).
mover(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mover"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 89).
?DOC("\n").
-spec msub(
    list(lustre@vdom@vattr:attribute(YSC)),
    list(lustre@vdom@vnode:element(YSC))
) -> lustre@vdom@vnode:element(YSC).
msub(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"msub"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 97).
?DOC("\n").
-spec msubsup(
    list(lustre@vdom@vattr:attribute(YSI)),
    list(lustre@vdom@vnode:element(YSI))
) -> lustre@vdom@vnode:element(YSI).
msubsup(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"msubsup"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 105).
?DOC("\n").
-spec msup(
    list(lustre@vdom@vattr:attribute(YSO)),
    list(lustre@vdom@vnode:element(YSO))
) -> lustre@vdom@vnode:element(YSO).
msup(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"msup"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 113).
?DOC("\n").
-spec munder(
    list(lustre@vdom@vattr:attribute(YSU)),
    list(lustre@vdom@vnode:element(YSU))
) -> lustre@vdom@vnode:element(YSU).
munder(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"munder"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 121).
?DOC("\n").
-spec munderover(
    list(lustre@vdom@vattr:attribute(YTA)),
    list(lustre@vdom@vnode:element(YTA))
) -> lustre@vdom@vnode:element(YTA).
munderover(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"munderover"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 131).
?DOC("\n").
-spec mroot(
    list(lustre@vdom@vattr:attribute(YTG)),
    list(lustre@vdom@vnode:element(YTG))
) -> lustre@vdom@vnode:element(YTG).
mroot(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mroot"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 139).
?DOC("\n").
-spec msqrt(
    list(lustre@vdom@vattr:attribute(YTM)),
    list(lustre@vdom@vnode:element(YTM))
) -> lustre@vdom@vnode:element(YTM).
msqrt(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"msqrt"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 149).
?DOC("\n").
-spec annotation(
    list(lustre@vdom@vattr:attribute(YTS)),
    list(lustre@vdom@vnode:element(YTS))
) -> lustre@vdom@vnode:element(YTS).
annotation(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"annotation"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 157).
?DOC("\n").
-spec annotation_xml(
    list(lustre@vdom@vattr:attribute(YTY)),
    list(lustre@vdom@vnode:element(YTY))
) -> lustre@vdom@vnode:element(YTY).
annotation_xml(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"annotation-xml"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 165).
?DOC("\n").
-spec mfrac(
    list(lustre@vdom@vattr:attribute(YUE)),
    list(lustre@vdom@vnode:element(YUE))
) -> lustre@vdom@vnode:element(YUE).
mfrac(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mfrac"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 173).
?DOC("\n").
-spec mn(list(lustre@vdom@vattr:attribute(YUK)), binary()) -> lustre@vdom@vnode:element(YUK).
mn(Attrs, Text) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mn"/utf8>>,
        Attrs,
        [lustre@element:text(Text)]
    ).

-file("src/lustre/element/mathml.gleam", 178).
?DOC("\n").
-spec mo(list(lustre@vdom@vattr:attribute(YUO)), binary()) -> lustre@vdom@vnode:element(YUO).
mo(Attrs, Text) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mo"/utf8>>,
        Attrs,
        [lustre@element:text(Text)]
    ).

-file("src/lustre/element/mathml.gleam", 183).
?DOC("\n").
-spec mi(list(lustre@vdom@vattr:attribute(YUS)), binary()) -> lustre@vdom@vnode:element(YUS).
mi(Attrs, Text) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mi"/utf8>>,
        Attrs,
        [lustre@element:text(Text)]
    ).

-file("src/lustre/element/mathml.gleam", 188).
?DOC("\n").
-spec mpadded(
    list(lustre@vdom@vattr:attribute(YUW)),
    list(lustre@vdom@vnode:element(YUW))
) -> lustre@vdom@vnode:element(YUW).
mpadded(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mpadded"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 196).
?DOC("\n").
-spec ms(list(lustre@vdom@vattr:attribute(YVC)), binary()) -> lustre@vdom@vnode:element(YVC).
ms(Attrs, Text) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"ms"/utf8>>,
        Attrs,
        [lustre@element:text(Text)]
    ).

-file("src/lustre/element/mathml.gleam", 201).
?DOC("\n").
-spec mspace(list(lustre@vdom@vattr:attribute(YVG))) -> lustre@vdom@vnode:element(YVG).
mspace(Attrs) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mspace"/utf8>>,
        Attrs,
        []
    ).

-file("src/lustre/element/mathml.gleam", 206).
?DOC("\n").
-spec mtable(
    list(lustre@vdom@vattr:attribute(YVK)),
    list(lustre@vdom@vnode:element(YVK))
) -> lustre@vdom@vnode:element(YVK).
mtable(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mtable"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 214).
?DOC("\n").
-spec mtd(
    list(lustre@vdom@vattr:attribute(YVQ)),
    list(lustre@vdom@vnode:element(YVQ))
) -> lustre@vdom@vnode:element(YVQ).
mtd(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mtd"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/mathml.gleam", 222).
?DOC("\n").
-spec mtext(list(lustre@vdom@vattr:attribute(YVW)), binary()) -> lustre@vdom@vnode:element(YVW).
mtext(Attrs, Text) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mtext"/utf8>>,
        Attrs,
        [lustre@element:text(Text)]
    ).

-file("src/lustre/element/mathml.gleam", 227).
?DOC("\n").
-spec mtr(
    list(lustre@vdom@vattr:attribute(YWA)),
    list(lustre@vdom@vnode:element(YWA))
) -> lustre@vdom@vnode:element(YWA).
mtr(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"mtr"/utf8>>,
        Attrs,
        Children
    ).
