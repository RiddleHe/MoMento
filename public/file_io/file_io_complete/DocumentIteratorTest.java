
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.NoSuchElementException;

import org.junit.Test;

public class DocumentIteratorTest {

	/**
	 * The JUnit5 way of testing if an exception is thrown.
	 */
	@Test
	public void testNull() {
		assertThrows(NullPointerException.class, () -> {
			new DocumentIterator(null);
		});

	}

	/**
	 * The old way of testing for exceptions, which is OK and a little simpler to
	 * read.
	 */
	@Test(expected = NullPointerException.class)
	public void testNullOldWay() {
		new DocumentIterator(null);
	}

	/**
	* 
	*/
	@Test
	public void testHasNext() {
		Reader r = new StringReader("one");
		DocumentIterator ws = new DocumentIterator(r);
		assertTrue(ws.hasNext());

	}

	/**
	* 
	*/
	@Test
	public void testHasNextBlank() {
		Reader r = new StringReader("  ");
		DocumentIterator ws = new DocumentIterator(r);
		assertFalse(ws.hasNext());

	}

	/**
	 * @throws IOException
	 * 
	 */
	@Test
	public void testNextSucceeds() throws IOException {
		Reader r = new StringReader("one two three four five");
		DocumentIterator ws = new DocumentIterator(r);
		assertEquals("one", ws.next());
	}

	@Test
	public void testStringReader() throws IOException {
		Reader r = new StringReader("�lucider quelque chose pour moi");
		char c = (char) r.read();
		System.out.println(c);
		assertEquals('�', c);
		assertEquals('�', r.read());
	}

	/**
	* 
	*/
	@Test
	public void testHasNextTrailing() {
		Reader r = new StringReader("one two three");
		DocumentIterator ws = new DocumentIterator(r);
		assertTrue(ws.hasNext());
		assertEquals("one", ws.next());
		assertTrue(ws.hasNext());
	}

	/**
	* 
	*/
	@Test
	public void testNextNext() {
		Reader r = new StringReader("one two");
		DocumentIterator ws = new DocumentIterator(r);
		assertTrue(ws.hasNext());
		assertEquals("one", ws.next());
		assertTrue(ws.hasNext());
		assertEquals("two", ws.next());
		assertFalse(ws.hasNext());

	}

	@Test
	public void testNextException() {
		Reader r = new StringReader("one two");
		DocumentIterator ws = new DocumentIterator(r);
		assertTrue(ws.hasNext());
		assertEquals("one", ws.next());
		assertTrue(ws.hasNext());
		assertEquals("two", ws.next());
		assertFalse(ws.hasNext());
		assertThrows(NoSuchElementException.class, () -> {
			ws.next();
		});
	}

	/**
	* 
	*/
	@Test
	public void testHasNextPunc() {

		Reader r = new StringReader(".*#^$#$");
		DocumentIterator ws = new DocumentIterator(r);
		assertFalse(ws.hasNext());

	}

	/**
	* 
	*/
	@Test
	public void testHasNextApostrophe() {
		Reader r = new StringReader("don't do it");
		DocumentIterator ws = new DocumentIterator(r);
		assertTrue(ws.hasNext());
		assertEquals("don", ws.next());
		assertTrue(ws.hasNext());

	}

}
