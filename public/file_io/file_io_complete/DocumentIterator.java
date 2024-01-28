
import java.io.IOException;
import java.io.Reader;
import java.util.Iterator;
import java.util.NoSuchElementException;

public class DocumentIterator implements Iterator<String> {

	private Reader r;
	private int c = -1;

	public DocumentIterator(Reader r) {
		this.r = r;
		skipNonLetters();
	}

	private void skipNonLetters() {
		try {
			this.c = this.r.read();
			while (!Character.isLetter(this.c) && this.c != -1) {
				this.c = this.r.read();
			}
		} catch (IOException e) {
			this.c = -1;
		}
	}

	@Override
	public boolean hasNext() {
		return (c != -1);
	}

	@Override
	public String next() {

		if (!hasNext()) {
			throw new NoSuchElementException();
		}
		String answer = "";

		try {

			while (Character.isLetter(this.c)) {
				answer = answer + (char) this.c;
				this.c = this.r.read();
			}
			skipNonLetters();

		} catch (IOException e) {
			throw new NoSuchElementException();
		}

		return answer;
	}

}
