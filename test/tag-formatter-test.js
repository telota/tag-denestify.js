import test from 'ava';
import {formatTagString} from '../tag-formatter';

test("converts String into correct new String", t =>{

    t.is(formatTagString("My <t>Hello <p>World</p></t>"), "My <t>Hello </t><p>World</p>");
    t.is(formatTagString("<t>Hello <p>World</p></t>"), "<t>Hello </t><p>World</p>");
    t.is(formatTagString('<hi rend="4_-_multiple_modification" class="modified">' +
        'H<del class="deleted">ell</del>o</hi>' +
        '<hi rend="4_-_multiple_modification" class="modified">Su<del class="deleted">' +
        'mmern</del>ote</hi> Test'),
        '<hi rend="4_-_multiple_modification" class="modified">H</hi>' +
        '<del class="deleted">ell</del>' +
        '<hi rend="4_-_multiple_modification" class="modified">o</hi>' +
        '<hi rend="4_-_multiple_modification" class="modified">Su</hi>' +
        '<del class="deleted">mmern</del>' +
        '<hi rend="4_-_multiple_modification" class="modified">ote</hi> Test'
    );
    t.is(formatTagString('<t><d>Hello</d>World</t>'),'<d>Hello</d><t>World</t>');
});

test("Testing multiple nesting", t =>{

    t.is(formatTagString("My <t>Hello <p>Wor<d>ld</d></p></t>"), "My <t>Hello </t><p>Wor</p><d>ld</d>");
    t.is(formatTagString("My <t>Hello <p>W<d>o<a>r</a>ld</d></p></t>"), "My <t>Hello </t><p>W</p><d>o</d><a>r</a><d>ld</d>");
});

test("Testing with empty Tags", t=>{
    t.is(formatTagString("<t></t><t><d>Hello</d>World</t>"), "<d>Hello</d><t>World</t>");
    t.is(formatTagString("<t></t><t><d>Hello</d></t><a></a>"), "<d>Hello</d>");
});
