import test from 'ava';
import tagFormatter from '../tag-formatter';

test('Splits String into TagArray', t => {

    let formattedString = tagFormatter.splitStringByTag("<t>Hallo</t><p>Du</p>");
    let formattedString2 = tagFormatter.splitStringByTag("<t>Hallo<p>Du</p></t>");

    t.deepEqual(formattedString,["<t>", "</t>", "<p>", "</p>"] );
    t.deepEqual(formattedString2,["<t>", "<p>", "</p>", "</t>"] );

});

test('Splits String into ContentArray', t => {

    let formattedString = tagFormatter.splitStringIntoContent("<t>Hallo</t><p>Du</p>");

    t.deepEqual(formattedString,["Hallo", "Du"] );

});

test('checks if Array gets rebuild correctly', t => {

    let formattedString = tagFormatter.splitStringByTag("<t>Hallo<p>Du</p></t>");
    let formattedString2 = tagFormatter.splitStringByTag('<hi rend="4_-_multiple_modification" class="modified">H<del class="deleted">ell</del>o</hi><hi rend="4_-_multiple_modification" class="modified">Su<del class="deleted">mmern</del>ote</hi>');

    t.deepEqual(tagFormatter.buildNewTagArray(formattedString),["<t>", "</t>", "<p>", "</p>", "<t>", "</t>"]);
    t.deepEqual(tagFormatter.buildNewTagArray(formattedString2),
        ['<hi rend="4_-_multiple_modification" class="modified">', '</hi>',
            '<del class="deleted">', '</del>',
            '<hi rend="4_-_multiple_modification" class="modified">', '</hi>',
            '<hi rend="4_-_multiple_modification" class="modified">', '</hi>',
            '<del class="deleted">', '</del>',
            '<hi rend="4_-_multiple_modification" class="modified">', '</hi>']);

});

test("converts String into correct new String", t =>{

    t.is(tagFormatter.formatTagString("Du <t>Hallo <p>Du</p></t>"), "Du <t>Hallo </t><p>Du</p>");
    t.is(tagFormatter.formatTagString("<t>Hallo <p>Du</p></t>"), "<t>Hallo </t><p>Du</p>");
    t.is(tagFormatter.formatTagString('<hi rend="4_-_multiple_modification" class="modified">' +
                        'H<del class="deleted">ell</del>o</hi>' +
                        '<hi rend="4_-_multiple_modification" class="modified">Su<del class="deleted">' +
                        'mmern</del>ote</hi> Bist'),
        '<hi rend="4_-_multiple_modification" class="modified">H</hi>' +
        '<del class="deleted">ell</del>' +
        '<hi rend="4_-_multiple_modification" class="modified">o</hi>' +
        '<hi rend="4_-_multiple_modification" class="modified">Su</hi>' +
        '<del class="deleted">mmern</del>' +
        '<hi rend="4_-_multiple_modification" class="modified">ote</hi> Bist'
        )

});

test("Testing multiple nesting", t =>{

    t.is(tagFormatter.formatTagString("Du <t>Hallo <p>D<d>u</d></p></t>"),
        "Du <t>Hallo </t><p>D</p><d>u</d>");
    t.is(tagFormatter.formatTagString("Du <t>Hallo <p>D<d>uf<a>ff</a>hj</d></p></t>"),
        "Du <t>Hallo </t><p>D</p><d>uf</d><a>ff</a><d>hj</d>");

});
